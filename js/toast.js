"use strict";
const toast = document.getElementById('toasts');
function createToast(message, type) {
    let properties;
    const notif = document.createElement('div');
    const notifIcon = document.createElement('span');
    properties = setProperties(type);
    notif.classList.add('toast');
    notif.classList.add(type);
    notifIcon.classList.add(properties[0].toString());
    notifIcon.classList.add(properties[1].toString());
    notifIcon.classList.add('icono');
    notif.innerText = message;
    toast.appendChild(notif);
    notif.append(notifIcon);
    setTimeout(() => {
        notif.remove();
    }, 3000);
}
function setProperties(type) {
    let propertyList;
    switch (type) {
        case 'info':
            propertyList = ['fas', 'fa-info-circle', 0];
            break;
        case 'error':
            propertyList = ['fas', 'fa-exclamation-circle', 1];
            break;
        case 'success':
            propertyList = ['fas', 'fa-check-circle', 2];
            break;
        case 'warning':
            propertyList = ['fas', 'fa-exclamation-triangle', 3];
            break;
    }
    return propertyList;
}
