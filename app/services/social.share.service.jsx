import React from 'react';
import BaseService from './base.serivce.jsx';
class SocialShareService {

    constructor() {

    }

    shareOnFacebook(title, description, targetUrl, imageUrl) {
        FB.ui({
            method: 'share',
            title: title,
            description: description,
            href: BaseService.fullHostName + targetUrl,
            picture: BaseService.fullHostName + imageUrl
        }, function (response) {
        });
    }

    shareOnGooglePlus(targetUrl, name) {
        window.open(`https://plus.google.com/share?description=HelloDescription&title=asfhasf&url=${BaseService.fullHostName + targetUrl}&prefilltext=${name}`,
            'MsgWindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }

    shareOnTwitter(targetUrl, name) {
        window.open(`https://twitter.com/share?url=${BaseService.fullHostName + targetUrl}&text=${name}`,
            'MsgWindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }

    shareOnPintrest(targetUrl, name) {
        window.open(`https://www.pinterest.com/pin/create/button/`,
            'MsgWindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }

    shareOnWhatsapp(targetUrl, name) {
        window.open(`whatsapp://send?text=Found ${name} very interesting gadget on ${BaseService.fullHostName + targetUrl}`,
            'MsgWindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    }
}

export default (new SocialShareService());