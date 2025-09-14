/**
 * خدمات API للشهادات
 *
 * هذا الملف يحتوي على دوال للتعامل مع بيانات الشهادات
 * يتصل بنقاط نهاية API الحقيقية لإدارة الشهادات
 */

// عنوان API الأساسي
const API_BASE_URL = "https://azinternational-eg.com/api";

// وقت التخزين المؤقت - 5 دقائق
const CACHE_TTL = 5 * 60 * 1000;

// كائن للتخزين المؤقت
const cache = {
  data: new Map(),
  timestamps: new Map(),

  // حفظ البيانات في التخزين المؤقت
  set(key, data) {
    this.data.set(key, data);
    this.timestamps.set(key, Date.now());
    return data;
  },

  // الحصول على البيانات من التخزين المؤقت
  get(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) return null;

    // التحقق من صلاحية التخزين المؤقت
    const isExpired = Date.now() - timestamp > CACHE_TTL;
    if (isExpired) {
      this.data.delete(key);
      this.timestamps.delete(key);
      return null;
    }

    return this.data.get(key);
  },

  // مسح التخزين المؤقت
  invalidate(keyPattern) {
    if (keyPattern instanceof RegExp) {
      // مسح المفاتيح التي تطابق النمط
      [...this.data.keys()].forEach((key) => {
        if (keyPattern.test(key)) {
          this.data.delete(key);
          this.timestamps.delete(key);
        }
      });
    } else if (typeof keyPattern === "string") {
      // مسح مفتاح محدد
      this.data.delete(keyPattern);
      this.timestamps.delete(keyPattern);
    } else {
      // مسح جميع المفاتيح
      this.data.clear();
      this.timestamps.clear();
    }
  },
};

/**
 * الحصول على جميع الشهادات
 * @returns {Promise<Array>} وعد يحتوي على مصفوفة من الشهادات
 */
export async function getAllServices() {
  const cacheKey = "getAllServices";
  const cachedData = cache.get(cacheKey);

  // إذا وجدنا بيانات مخزنة مؤقتًا، نستخدمها
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`خطأ في الحصول على جميع الشهادات: ${response.status}`);
    }

    const data = await response.json();
    // تخزين البيانات مؤقتًا قبل إرجاعها
    return cache.set(cacheKey, data);
  } catch (error) {
    throw error;
  }
}

/**
 * البحث عن شهادة باستخدام الاسم
 * @param {string} search - نص البحث (اسم)
 * @returns {Promise<Array>} وعد يحتوي على مصفوفة من الشهادات المطابقة
 */
export async function searchServiceByName(search) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Services/searchByName?search=${encodeURIComponent(
        search
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Handle 404 as empty results instead of error
    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      // Return empty results for non-critical errors
      return [];
    }

    const data = await response.json();

    // Process certificate data
    const processedData = Array.isArray(data)
      ? data.map((cert) => ({
          ...cert,
        }))
      : [];

    return processedData;
  } catch (error) {
    // Return empty results for any errors
    return [];
  }
}

/**
 * البحث عن شهادة باستخدام الرقم التسلسلي
 * @param {string} search - نص البحث (رقم تسلسلي)
 * @returns {Promise<Array>} وعد يحتوي على مصفوفة من الشهادات المطابقة
 */
export async function searchServiceBySerialNumber(search) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Services/searchByS_N?search=${encodeURIComponent(
        search
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Handle 404 as empty results instead of error
    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      // Return empty results for non-critical errors
      return [];
    }

    const data = await response.json();

    // Process certificate data
    const processedData = Array.isArray(data)
      ? data.map((cert) => ({
          ...cert,
        }))
      : [];

    return processedData;
  } catch (error) {
    // Return empty results for any errors
    return [];
  }
}

/**
 * Search for a certificate by ID or serial number
 * @param {string} search - Search text (ID or serial number)
 * @returns {Promise<Object>} Promise containing the matching certificate
 */
export async function searchService(search) {
  try {
    // Check if search is a serial number
    const results = await searchServiceBySerialNumber(search);

    if (results && results.length > 0) {
      const result = results[0];
      return {
        ...result,
      };
    }

    // If no results found by serial number, try getting by ID
    try {
      const idResult = await getServiceById(search);
      if (idResult) {
        // Format the location data properly
        return {
          ...idResult,
          location: {
            country: idResult.country || "",
            state: idResult.state || "",
            streetAddress: idResult.streetAddress || "",
          },
        };
      }
    } catch (idError) {
      // Silently ignore ID search errors and return null
    }

    return null;
  } catch (error) {
    console.error("Error in searchService:", error);
    return null;
  }
}

/**
 * إنشاء شهادة جديدة
 * @param {Object} data - بيانات الشهادة الجديدة
 * @returns {Promise<Object>} وعد يحتوي على الشهادة المنشأة
 */
export async function createService(data) {
  try {
    // Format the data according to API requirements
    const formattedData = {
      name: data.name?.trim() || "",
      s_N: data.s_N?.trim() || "",
      method: parseInt(data.method) || 1,
      type: parseInt(data.type) || 1,
      endDate: data.endDate
        ? new Date(data.endDate).toISOString()
        : new Date().toISOString(),
      // Include empty location fields as the API still expects them
      country: "",
      state: "",
      streetAddress: "",
    };

    const response = await fetch(`${API_BASE_URL}/Services/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorText = await response.text();

      // More user-friendly error messages based on status code
      if (response.status === 400) {
        throw new Error(
          "Invalid certificate data. Please check all fields and try again."
        );
      } else if (response.status === 401 || response.status === 403) {
        throw new Error("You don't have permission to create certificates.");
      } else if (response.status === 409) {
        throw new Error(
          "A certificate with this serial number already exists."
        );
      } else if (response.status === 500) {
        throw new Error(
          "Server error. Please try again later or contact support."
        );
      } else {
        throw new Error(`Failed to create certificate. Please try again.`);
      }
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // If the error is already user-friendly (from our catches above), pass it through
    // Otherwise, provide a generic message
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    }
    throw error;
  }
}

/**
 * تحديث شهادة موجودة
 * @param {number} id - معرف الشهادة
 * @param {Object} data - بيانات الشهادة المحدثة
 * @returns {Promise<Object>} وعد يحتوي على الشهادة المحدثة
 */
export async function updateService(id, data) {
  try {
    // Format the data according to API requirements
    const formattedData = {
      srId: parseInt(id),
      name: data.name?.trim() || "",
      s_N: data.s_N?.trim() || "",
      method: parseInt(data.method) || 1,
      type: parseInt(data.type) || 1,
      endDate: data.endDate
        ? new Date(data.endDate).toISOString()
        : new Date().toISOString(),
      country: "",
      state: "",
      streetAddress: "",
    };

    const response = await fetch(`${API_BASE_URL}/Services/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorText = await response.text();

      // More user-friendly error messages based on status code
      if (response.status === 400) {
        throw new Error(
          "Invalid certificate data. Please check all fields and try again."
        );
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          "You don't have permission to update this certificate."
        );
      } else if (response.status === 404) {
        throw new Error("Certificate not found. It may have been deleted.");
      } else if (response.status === 409) {
        throw new Error(
          "A certificate with this serial number already exists."
        );
      } else if (response.status === 500) {
        throw new Error(
          "Server error. Please try again later or contact support."
        );
      } else {
        throw new Error(`Failed to update certificate. Please try again.`);
      }
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // If the error is already user-friendly (from our catches above), pass it through
    // Otherwise, provide a generic message
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    }
    throw error;
  }
}

/**
 * حذف شهادة
 * @param {number} id - معرف الشهادة
 * @returns {Promise<boolean>} وعد يحتوي على نتيجة الحذف
 */
export async function deleteService(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/Services/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // More user-friendly error messages based on status code
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "You don't have permission to delete this certificate."
        );
      } else if (response.status === 404) {
        throw new Error(
          "Certificate not found. It may have already been deleted."
        );
      } else if (response.status === 500) {
        throw new Error(
          "Server error. Please try again later or contact support."
        );
      } else {
        throw new Error(`Failed to delete certificate. Please try again.`);
      }
    }

    // إبطال مفعول التخزين المؤقت بعد الحذف
    cache.invalidate(/^(getAllServices|searchByName|searchBySerial)/);

    return true;
  } catch (error) {
    // If the error is already user-friendly (from our catches above), pass it through
    // Otherwise, provide a generic message
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    }
    throw error;
  }
}

/**
 * إرسال بريد إلكتروني
 * @param {Object} emailData - بيانات البريد الإلكتروني
 * @param {string} emailData.userName - اسم المستخدم
 * @param {string} emailData.userEmail - بريد المستخدم الإلكتروني
 * @param {string} emailData.subject - موضوع البريد
 * @param {string} emailData.message - محتوى البريد
 * @returns {Promise<Object>} - نتيجة عملية الإرسال
 */
export async function sendEmail(emailData) {
  try {
    const response = await fetch(`${API_BASE_URL}/Email/SendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : { success: true };
  } catch (error) {
    throw error;
  }
}

/**
 * رفع ملف اكسل للشهادات
 * @param {File} file - ملف الاكسل للرفع
 * @returns {Promise<Object>} نتيجة عملية الرفع
 */
export async function uploadExcelFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/Services/UploadExcelFile`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // User-friendly error messages
      if (response.status === 400) {
        throw new Error(
          "Invalid file. Please check the file format and try again."
        );
      } else if (response.status === 401 || response.status === 403) {
        throw new Error(
          "You don't have permission to upload certificate files."
        );
      } else if (response.status === 500) {
        throw new Error(
          "Server error. Please try again later or contact support."
        );
      } else {
        throw new Error("Failed to upload file. Please try again.");
      }
    }

    // محاولة معالجة الاستجابة كـ JSON بحذر
    let result;
    try {
      const text = await response.text();
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        // If JSON parsing fails, check if the response contains a success message
        if (
          text.includes("success") ||
          text.includes("Successfully") ||
          text.includes("uploaded")
        ) {
          result = {
            success: true,
            message: "File uploaded successfully",
            addedCount: "multiple", // Default value if not available
            data: text, // Keep original text for verification
          };
        } else {
          console.error("Failed to parse JSON response:", text);
          throw new Error("Invalid response format from server");
        }
      }
    } catch (error) {
      console.error("Error reading response:", error);
      throw new Error("Error reading response from server");
    }

    // Invalidate cache after upload
    cache.invalidate(/^(getAllServices|searchByName|searchBySerial)/);

    return result;
  } catch (error) {
    // If error is already handled, pass it through, otherwise give a general message
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    }
    throw error;
  }
}

/**
 * Get certificate by ID
 * @param {number} id - Certificate ID
 * @returns {Promise<Object>} Certificate data
 */
export async function getServiceById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/Services/getById?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Handle 404 with more specific error
    if (response.status === 404) {
      throw new Error("Certificate not found. It may have been deleted.");
    }

    if (!response.ok) {
      // More user-friendly error messages based on status code
      if (response.status === 401 || response.status === 403) {
        throw new Error("You don't have permission to view this certificate.");
      } else if (response.status === 500) {
        throw new Error(
          "Server error. Please try again later or contact support."
        );
      } else {
        throw new Error("Failed to retrieve certificate. Please try again.");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // If the error is already user-friendly (from our catches above), pass it through
    // Otherwise, provide a generic message
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    }
    throw error;
  }
}
