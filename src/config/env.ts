export const fetchJobInterval = () => {
  const defaultInterval = 5000;
  if (!process.env.NEXT_PUBLIC_FETCH_JOB_INTERVAL) return defaultInterval;
  const n = validateAndReturnNumber(process.env.NEXT_PUBLIC_FETCH_JOB_INTERVAL)
  if (n === 0) {
    return defaultInterval
  }
  if (n < 1000) {
    return defaultInterval
  }
  return n
};

export const fetchBalanceInterval = () => {
  const defaultInterval = 10000;
  if (!process.env.NEXT_PUBLIC_FETCH_BALANCE_INTERVAL) return defaultInterval;
  const n = validateAndReturnNumber(process.env.NEXT_PUBLIC_FETCH_BALANCE_INTERVAL)
  if (n === 0) {
    return defaultInterval
  }
  if (n < 1000) {
    return defaultInterval
  }
  return n
};

function validateAndReturnNumber(value: string): number {
  const regex = /^\d+$/;
  if (regex.test(value)) {
    return Number(value);
  } else {
    return 0;
  }
}