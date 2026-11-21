// Админка работает только на локальном сервере (localhost, 127.0.0.1). На сайте её нет.
export const ADMIN_HOST = typeof location !== 'undefined' && ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
let open = false;
try { open = ADMIN_HOST && localStorage.getItem('ep.admin.open') === '1'; } catch { /* нет хранилища */ }
// «Открыть всё»: все уровни и фазы доступны без прохождения
export const ADMIN_OPEN = open;
