/**
 * خدمات API للشهادات
 *
 * هذا الملف يحتوي على دوال للتعامل مع بيانات الشهادات
 * يتصل بنقاط نهاية API الحقيقية لإدارة الشهادات
 */

import type { Service, ServiceDto } from "./types";

// عنوان API الأساسي
const API_BASE_URL = "https://azinternational-eg.com/api";

// وقت التخزين المؤقت - 5 دقائق
const CACHE_TTL = 5 * 60 * 1000;

// كائن للتخزين المؤقت
const cache = {
  data: new Map<string, unknown>(),
  timestamps: new Map<string, number>(),

  // حفظ البيانات في التخزين المؤقت
  set<T>(key: string, data: T): T {
    this.data.set(key, data);
    this.timestamps.set(key, Date.now());
    return data;
  },

  // الحصول على البيانات من التخزين المؤقت
  get<T>(key: string): T | null {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) return null;

    // التحقق من صلاحية التخزين المؤقت
    const isExpired = Date.now() - timestamp > CACHE_TTL;
    if (isExpired) {
      this.data.delete(key);
      this.timestamps.delete(key);
      return null;
    }

    return this.data.get(key) as T;
  },

  // مسح التخزين المؤقت
  invalidate(keyPattern?: RegExp | string): void {
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
export async function getAllServices(): Promise<Service[]> {
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
export async function searchServiceByName(search: string): Promise<Service[]> {
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

    // Ensure each certificate has properly initialized location fields
    const processedData = Array.isArray(data)
      ? data.map((cert) => ({
          ...cert,
          country: cert.country || "",
          state: cert.state || "",
          streetAddress: cert.streetAddress || "",
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
export async function searchServiceBySerialNumber(search: string): Promise<Service[]> {
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

    // Ensure each certificate has properly initialized location fields
    const processedData = Array.isArray(data)
      ? data.map((cert) => ({
          ...cert,
          country: cert.country || "",
          state: cert.state || "",
          streetAddress: cert.streetAddress || "",
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
export async function searchService(search: string): Promise<Service | null> {
  try {
    // Check if search is a serial number
    const results = await searchServiceBySerialNumber(search);

    if (results && results.length > 0) {
      // Format the location data properly
      const result = results[0];
      return {
        ...result,
        location: {
          country: result.country || "",
          state: result.state || "",
          streetAddress: result.streetAddress || "",
        },
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
export async function createService(data: ServiceDto): Promise<Service> {
  try {
    // Format the data according to API requirements
    const formattedData = {
      name: data.name?.trim() || "",
      s_N: data.s_N?.trim() || "",
      method: parseInt(data.method) || 1,
      startDate: data.startDate
        ? new Date(data.startDate).toISOString()
        : new Date().toISOString(),
      endDate: data.endDate
        ? new Date(data.endDate).toISOString()
        : new Date().toISOString(),
      // Handle both nested location object and flat location properties
      country: data.location?.country?.trim() || data.country?.trim() || "",
      state: data.location?.state?.trim() || data.state?.trim() || "",
      streetAddress:
        data.location?.streetAddress?.trim() ||
        data.streetAddress?.trim() ||
        "",
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
export async function updateService(id: number, data: ServiceDto): Promise<Service> {
  try {
    // Format the data according to API requirements
    const formattedData = {
      srId: parseInt(id),
      name: data.name?.trim() || "",
      s_N: data.s_N?.trim() || "",
      method: parseInt(data.method) || 1,
      startDate: data.startDate
        ? new Date(data.startDate).toISOString()
        : new Date().toISOString(),
      endDate: data.endDate
        ? new Date(data.endDate).toISOString()
        : new Date().toISOString(),
      country: data.location?.country?.trim() || data.country?.trim() || "",
      state: data.location?.state?.trim() || data.state?.trim() || "",
      streetAddress:
        data.location?.streetAddress?.trim() ||
        data.streetAddress?.trim() ||
        "",
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
export async function deleteService(id: number): Promise<boolean> {
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
export interface EmailData {
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
}

export async function sendEmail(emailData: EmailData): Promise<unknown> {
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
 * Get certificate by ID
 * @param {number} id - Certificate ID
 * @returns {Promise<Object>} Certificate data
 */
export async function getServiceById(id: number | string): Promise<Service> {
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
