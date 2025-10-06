function calculateTotal(amount: string): number {
  const amountArray = amount
    .split(/[\n,]+/)
    .map((amt) => amt.trim())
    .filter((amt) => amt !== "")
    .map((amt) => parseFloat(amt));

  return amountArray
    .filter((num) => !isNaN(num))
    .reduce((sum, num) => sum + num, 0);
}

export default calculateTotal;
