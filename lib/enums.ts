/**
 * Service method enum
 */
export enum ServiceMethod {
  MagneticParticleTesting = 1,
  LiquidPenetrantTesting,
  RadiographicTesting,
  UltrasonicTesting,
  VisualTesting,
}

/**
 * Service method labels
 */
export const ServiceMethodLabels: Record<ServiceMethod, string> = {
  [ServiceMethod.MagneticParticleTesting]: "Magnetic Particle Testing",
  [ServiceMethod.LiquidPenetrantTesting]: "Liquid Penetrant Testing",
  [ServiceMethod.RadiographicTesting]: "Radiographic Testing",
  [ServiceMethod.UltrasonicTesting]: "Ultrasonic Testing",
  [ServiceMethod.VisualTesting]: "Visual Testing",
};

/**
 * Service method options for dropdown
 */
export const ServiceMethodOptions = [
  {
    value: ServiceMethod.MagneticParticleTesting,
    label: "Magnetic Particle Testing",
  },
  {
    value: ServiceMethod.LiquidPenetrantTesting,
    label: "Liquid Penetrant Testing",
  },
  { value: ServiceMethod.RadiographicTesting, label: "Radiographic Testing" },
  { value: ServiceMethod.UltrasonicTesting, label: "Ultrasonic Testing" },
  { value: ServiceMethod.VisualTesting, label: "Visual Testing" },
];

/**
 * Get service method label by method id
 * @param {number} method - Method ID
 * @returns {string} Method label
 */
export function getServiceMethodLabel(method: ServiceMethod): string {
  return ServiceMethodLabels[method] || "Unknown Method";
}
