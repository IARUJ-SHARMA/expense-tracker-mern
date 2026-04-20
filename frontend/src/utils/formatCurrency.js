/**
 * Formats a given number into an Indian Rupee (INR) currency string.
 * @param {number} amount - The numeric amount to format
 * @returns {string} - The formatted currency string
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);
};