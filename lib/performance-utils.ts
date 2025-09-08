"use client";

/**
 * وظائف لتحسين الأداء وتجربة المستخدم
 */

/**
 * تأخير تنفيذ المهام غير الضرورية بعد تحميل الصفحة
 * @param {Function} callback الدالة التي ستنفذ
 * @param {number} delay التأخير بالمللي ثانية
 */
export function deferTask(callback: () => void, delay = 1000): void {
  if (typeof window === "undefined") return;
  
  // استخدام requestIdleCallback إذا كان متاحًا، وإلا استخدام setTimeout
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      setTimeout(callback, delay);
    });
  } else {
    setTimeout(callback, delay);
  }
}

/**
 * تقسيم المهام الثقيلة لتجنب تجميد واجهة المستخدم
 * @param {Array} items العناصر التي سيتم معالجتها
 * @param {Function} processor الدالة التي ستعالج كل عنصر
 * @param {number} batchSize حجم المجموعة (عدد العناصر في الدفعة الواحدة)
 * @param {number} delay التأخير بين الدفعات
 * @returns {Promise} وعد يتم حله عند اكتمال جميع المعالجات
 */
export function processBatch<T>(
  items: T[],
  processor: (item: T) => void,
  batchSize = 5,
  delay = 10
): Promise<void> {
  return new Promise((resolve) => {
    if (!items.length) {
      resolve();
      return;
    }

    const batchProcessor = (startIndex: number): void => {
      const endIndex = Math.min(startIndex + batchSize, items.length);
      const batch = items.slice(startIndex, endIndex);

      // معالجة الدفعة الحالية
      batch.forEach(processor);

      // التحقق مما إذا انتهينا من جميع العناصر
      if (endIndex >= items.length) {
        resolve();
        return;
      }

      // جدولة الدفعة التالية
      setTimeout(() => batchProcessor(endIndex), delay);
    };

    // بدء المعالجة من العنصر الأول
    batchProcessor(0);
  });
}

/**
 * تحسين تفاعلات المستخدم من خلال تقليل تكرار الأحداث
 * @param {Function} func الدالة التي سيتم تنفيذها
 * @param {number} wait فترة الانتظار بالمللي ثانية
 * @returns {Function} دالة مُحسّنة
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 100
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * تقييد معدل تنفيذ الوظائف (مفيد جدًا للأحداث المتكررة مثل التمرير)
 * @param {Function} func الدالة التي سيتم تنفيذها
 * @param {number} limit الحد الأدنى للوقت بين التنفيذات
 * @returns {Function} دالة مُحسّنة
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit = 100
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
