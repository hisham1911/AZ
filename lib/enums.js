/**
 * Service method enum
 */
export const ServiceMethod = {
  MagneticParticleTesting: 1,
  LiquidPenetrantTesting: 2,
  RadiographicTesting: 3,
  UltrasonicTesting: 4,
  VisualTesting: 5,
};

/**
 * Service method labels
 */
export const ServiceMethodLabels = {
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
export function getServiceMethodLabel(method) {
  return ServiceMethodLabels[method] || "Unknown Method";
}
