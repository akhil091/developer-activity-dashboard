export const extractNameFromEmail = (email: string): string => {
    const namePart = email.split('@')[0];
    const name = namePart.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    return name;
};
