// HANDLEBAR HELPER - CREATED
export const handlebar_helper_created = Handlebars.registerHelper('formatTime', (created) => {
    return new Date(created).toLocaleString('en-US');
});

// HANDLEBAR HELPER - CONVERT COMPLETED_AT
export const handlebar_helper_completed_at = Handlebars.registerHelper('formatTime', (completed_at) => {
    return new Date(completed_at).toLocaleString('en-US');
});

// HANDLEBAR HELPER - CONVERT EXPIRE DATE
export const handlebar_helper_expire = Handlebars.registerHelper('formatExpire', (expire) => {
    const expireLocalTime = expire.toLocaleString('en-US');
    return new Date(expireLocalTime).toLocaleDateString('en-US');
});