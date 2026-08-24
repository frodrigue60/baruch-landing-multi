import type { PricingConfig, PricingOption, PricingPackage } from '@/lib/content/types';

export interface CostEstimateInput {
  packageId: string;
  personTypeId: string;
  reservationTypeId: string;
  locationId: string;
  days: number;
  guests: number;
}

export interface CostEstimateBreakdown {
  basePricePerDay: number;
  days: number;
  guests: number;
  personMultiplier: number;
  reservationMultiplier: number;
  locationMultiplier: number;
  pricePerPersonPerDay: number;
  subtotalPerDay: number;
  total: number;
}

function findOption(options: PricingOption[], id: string): PricingOption | undefined {
  return options.find((option) => option.id === id);
}

function findPackage(packages: PricingPackage[], id: string): PricingPackage | undefined {
  return packages.find((item) => item.id === id);
}

/**
 * Cálculo orientativo en cliente:
 * total = base × días × huéspedes × tipoPersona × tipoReservación × ubicación
 */
export function calculateCostEstimate(
  config: PricingConfig,
  input: CostEstimateInput,
): CostEstimateBreakdown | null {
  const selectedPackage = findPackage(config.packages, input.packageId);
  const person = findOption(config.personTypes, input.personTypeId);
  const reservation = findOption(config.reservationTypes, input.reservationTypeId);
  const location = findOption(config.locations, input.locationId);

  if (!selectedPackage || !person || !reservation || !location) {
    return null;
  }

  const days = clamp(input.days, config.minDays, config.maxDays);
  const guests = clamp(input.guests, config.minGuests, config.maxGuests);

  const pricePerPersonPerDay =
    selectedPackage.basePricePerDay *
    person.multiplier *
    reservation.multiplier *
    location.multiplier;

  const subtotalPerDay = pricePerPersonPerDay * guests;
  const total = subtotalPerDay * days;

  return {
    basePricePerDay: selectedPackage.basePricePerDay,
    days,
    guests,
    personMultiplier: person.multiplier,
    reservationMultiplier: reservation.multiplier,
    locationMultiplier: location.multiplier,
    pricePerPersonPerDay,
    subtotalPerDay,
    total,
  };
}

export function formatMoney(
  amount: number,
  currencySymbol: string,
  locale: string,
): string {
  const formatted = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-MX', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(amount));

  return `${currencySymbol}${formatted}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
