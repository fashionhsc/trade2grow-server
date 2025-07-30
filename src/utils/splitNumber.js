const splitPhoneNumber = (fullPhoneNumber) => {
    const match = fullPhoneNumber.match(/^(\+\d{1,4})(\d{10,})$/);
    if (!match) return { countryCode: '', phoneNumber: '' };

    return {
        countryCode: match[1],     // e.g. "+91"
        phoneNumber: match[2],     // e.g. "8800784843"
    };
}

module.exports = splitPhoneNumber;