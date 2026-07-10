document.addEventListener('DOMContentLoaded', function () {
    const trackingInput = document.getElementById('trackingInput');
    const trackButton = document.getElementById('trackButton');
    const trackingResults = document.getElementById('trackingResults');
    const tdetailsInner = document.getElementById('tdetailsInner');
    const newSearchBtn = document.getElementById('newSearch');
    const trackingSection = document.getElementById('tracking');
    const homeBelowTrack = document.getElementById('homeBelowTrack');
    const mainMain = document.getElementById('mainMain');
    const mobileShell = document.getElementById('mobileShell');
    const logoHome = document.getElementById('logoHome');
    const trackingLoader = document.getElementById('trackingLoader');
    const backToTop = document.getElementById('backToTop');
    const langSelect = document.getElementById('langSelect');
    const trackingLoaderCard = document.getElementById('trackingLoaderCard');
    const htmlRoot = document.getElementById('htmlRoot');

    const LANG_STORAGE_KEY = 'fedex-demo-lang';
    let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
    if (currentLang !== 'en' && currentLang !== 'es') {
        currentLang = 'en';
    }
    let lastShownTrackingNumber = null;

    const TIMELINE_TITLE_ES = {
        FROM: 'DESDE',
        TO: 'HACIA',
        'LABEL CREATED': 'ETIQUETA CREADA',
        'PACKAGE RECEIVED BY FEDEX': 'PAQUETE RECIBIDO POR FEDEX',
        'IN TRANSIT': 'EN TRÁNSITO',
        'OUT FOR DELIVERY': 'EN REPARTO',
        DELIVERED: 'ENTREGADO'
    };

    const DELIVERY_STATUS_ES = {
        'In Transit': 'En tránsito',
        Delivered: 'Entregado',
        'Out For Delivery': 'En reparto'
    };

    const STR = {
        en: {
            docTitle: 'FedEx | Tracking',
            logoHomeAria: 'FedEx Home',
            accountAria: 'Account',
            menuAria: 'Menu',
            trackTitle: 'Track your FedEx<sup>\u00AE</sup> shipments',
            tabLabel: 'Select a tab',
            tabOptTracking: 'Tracking number',
            tabOptDoor: 'Door tag number',
            tabOptOffice: 'FedEx Office order number',
            tabAria: 'Tracking type',
            instructions:
                'Enter up to 30 of your FedEx tracking, door tag, or FedEx Office order numbers (one per line).',
            trackingNumLabel: 'Tracking number',
            needHelp: 'NEED HELP?',
            trackBtn: 'TRACK',
            headline: 'Take control of your deliveries',
            promo1Aria: 'FedEx Mobile app',
            promo1Title: 'Tap into more convenience',
            promo1Html:
                'Track packages, create shipments, manage pickups, and more on the <a href="#">FedEx<sup>\u00AE</sup> Mobile app</a>.',
            promo2Aria: 'FedEx Delivery Manager',
            promo2Title: 'Get deliveries your way',
            promo2Html:
                'Delivery instructions, redirects, and map view are waiting with <a href="#">FedEx Delivery Manager<sup>\u00AE</sup></a>.',
            supportHeading: 'Find helpful resources',
            supportLeadHtml:
                'From starting a return to handling a door tag, see how to <a href="#">manage your deliveries</a>.',
            supportQ: 'Not sure what your tracking status means?',
            statusGuide: 'CHECK THE STATUS GUIDE',
            supportHelp: 'Need additional help? Explore these resources.',
            supportSub: 'Access self-service support tools',
            supportBody: 'You can also browse help videos or contact our customer support team.',
            getSupport: 'GET SUPPORT',
            faqTitle: 'Get answers to tracking questions',
            faqText: 'Find answers to common questions in one convenient spot. And get the info you need fast.',
            faqLink: 'GO TO TRACKING FAQS',
            footerCompany: 'OUR COMPANY',
            footerAbout: 'About FedEx',
            footerPortfolio: 'Our Portfolio',
            footerInvestor: 'Investor Relations',
            footerCareers: 'Careers',
            footerContracting: 'Transportation Contracting Opportunities',
            footerBlog: 'FedEx Blog',
            footerResponsibility: 'Corporate Responsibility',
            footerNewsroom: 'Newsroom',
            footerMore: 'MORE FROM FEDEX',
            footerCompatible: 'FedEx Compatible',
            footerDeveloper: 'FedEx Developer Portal',
            footerLogistics: 'FedEx Logistics',
            footerLang: 'LANGUAGE',
            localeUS: 'United States',
            langAria: 'Language',
            optLangEn: 'English',
            optLangEs: 'Español',
            footerFollow: 'FOLLOW FEDEX',
            socialEmail: 'Email',
            socialFacebook: 'Facebook',
            socialX: 'X',
            socialInstagram: 'Instagram',
            socialLinkedIn: 'LinkedIn',
            legalSitemap: 'Site Map',
            legalCookies: 'Cookie Consent',
            legalTerms: 'Terms of Use',
            legalPrivacy: 'Privacy & Security',
            legalAds: 'Ad Choices',
            newSearch: 'Track another shipment',
            backToTop: 'BACK TO TOP',
            backToTopAria: 'Back to top',
            loaderAria: 'Loading tracking',
            scheduledDelivery: 'Scheduled delivery date',
            estimatedBetween: 'Estimated between',
            deliveryBy: 'By',
            asOf: 'As of',
            lastUpdatedAt: 'Last updated at',
            serviceLabel: 'SERVICE',
            senderName: "Sender's Name",
            receiverName: "Receiver's Name",
            packageContent: 'Package Content',
            sigRequired: 'Signature required',
            sigNotRequired: 'No signature required',
            onTime: 'ON TIME',
            deliveryStatus: 'DELIVERY STATUS',
            trackingId: 'TRACKING ID',
            labelCreatedPrefix: 'Label created ',
            notifEmpty: 'Please enter a tracking number',
            notifWrong: 'Please enter the correct tracking number',
            notifMulti: 'Demo: showing results for the first number only.',
            needHelpToast:
                'Tracking numbers are often 12 digits and appear on your receipt or shipping confirmation email.',
            copyrightLine: '© FedEx 1995–2026'
        },
        es: {
            docTitle: 'FedEx | Rastreo',
            logoHomeAria: 'Inicio FedEx',
            accountAria: 'Cuenta',
            menuAria: 'Menú',
            trackTitle: 'Rastree sus envíos de FedEx<sup>\u00AE</sup>',
            tabLabel: 'Seleccione una pestaña',
            tabOptTracking: 'Número de rastreo',
            tabOptDoor: 'Número de aviso de puerta',
            tabOptOffice: 'Número de pedido de FedEx Office',
            tabAria: 'Tipo de rastreo',
            instructions:
                'Ingrese hasta 30 números de rastreo de FedEx, avisos de puerta o pedidos de FedEx Office (uno por línea).',
            trackingNumLabel: 'Número de rastreo',
            needHelp: '¿NECESITA AYUDA?',
            trackBtn: 'RASTREAR',
            headline: 'Tome el control de sus entregas',
            promo1Aria: 'Aplicación móvil FedEx',
            promo1Title: 'Más comodidad al alcance de su mano',
            promo1Html:
                'Rastree paquetes, cree envíos, administre recogidas y más en la <a href="#">aplicación móvil FedEx<sup>\u00AE</sup></a>.',
            promo2Aria: 'FedEx Delivery Manager',
            promo2Title: 'Reciba sus entregas a su manera',
            promo2Html:
                'Instrucciones de entrega, redirecciones y vista en mapa le esperan con <a href="#">FedEx Delivery Manager<sup>\u00AE</sup></a>.',
            supportHeading: 'Encuentre recursos útiles',
            supportLeadHtml:
                'Desde iniciar una devolución hasta usar un aviso de puerta, vea cómo <a href="#">administrar sus entregas</a>.',
            supportQ: '¿No está seguro de qué significa el estado de rastreo?',
            statusGuide: 'CONSULTE LA GUÍA DE ESTADOS',
            supportHelp: '¿Necesita más ayuda? Explore estos recursos.',
            supportSub: 'Acceda a herramientas de autoservicio',
            supportBody: 'También puede ver videos de ayuda o comunicarse con nuestro equipo de atención al cliente.',
            getSupport: 'OBTENER AYUDA',
            faqTitle: 'Respuestas sobre rastreo',
            faqText: 'Encuentre respuestas a preguntas frecuentes en un solo lugar y obtenga la información que necesita.',
            faqLink: 'IR A PREGUNTAS FRECUENTES DE RASTREO',
            footerCompany: 'NUESTRA COMPAÑÍA',
            footerAbout: 'Acerca de FedEx',
            footerPortfolio: 'Nuestro portafolio',
            footerInvestor: 'Relaciones con inversionistas',
            footerCareers: 'Empleos',
            footerContracting: 'Oportunidades de contratación de transporte',
            footerBlog: 'Blog de FedEx',
            footerResponsibility: 'Responsabilidad corporativa',
            footerNewsroom: 'Sala de prensa',
            footerMore: 'MÁS DE FEDEX',
            footerCompatible: 'FedEx Compatible',
            footerDeveloper: 'Portal para desarrolladores de FedEx',
            footerLogistics: 'FedEx Logistics',
            footerLang: 'IDIOMA',
            localeUS: 'Estados Unidos',
            langAria: 'Idioma',
            optLangEn: 'Inglés',
            optLangEs: 'Español',
            footerFollow: 'SIGA A FEDEX',
            socialEmail: 'Correo',
            socialFacebook: 'Facebook',
            socialX: 'X',
            socialInstagram: 'Instagram',
            socialLinkedIn: 'LinkedIn',
            legalSitemap: 'Mapa del sitio',
            legalCookies: 'Consentimiento de cookies',
            legalTerms: 'Términos de uso',
            legalPrivacy: 'Privacidad y seguridad',
            legalAds: 'Opciones de anuncios',
            newSearch: 'Rastrear otro envío',
            backToTop: 'VOLVER ARRIBA',
            backToTopAria: 'Volver arriba',
            loaderAria: 'Cargando rastreo',
            scheduledDelivery: 'Fecha de entrega programada',
            estimatedBetween: 'Estimado entre',
            deliveryBy: 'Antes de las',
            asOf: 'A partir del',
            lastUpdatedAt: 'Última actualización en',
            serviceLabel: 'SERVICIO',
            senderName: 'Nombre del remitente',
            receiverName: 'Nombre del destinatario',
            packageContent: 'Contenido del paquete',
            sigRequired: 'Se requiere firma',
            sigNotRequired: 'No se requiere firma',
            onTime: 'A TIEMPO',
            deliveryStatus: 'ESTADO DE ENTREGA',
            trackingId: 'ID DE RASTREO',
            labelCreatedPrefix: 'Etiqueta creada el ',
            notifEmpty: 'Ingrese un número de rastreo',
            notifWrong: 'Ingrese un número de rastreo correcto',
            notifMulti: 'Demo: se muestran resultados solo para el primer número.',
            needHelpToast:
                'Los números de rastreo suelen tener 12 dígitos y aparecen en su recibo o correo de confirmación de envío.',
            copyrightLine: '© FedEx 1995–2026'
        }
    };

    function t(key) {
        const pack = STR[currentLang] || STR.en;
        return pack[key] !== undefined ? pack[key] : STR.en[key] !== undefined ? STR.en[key] : key;
    }

    function getIntlLocale() {
        return currentLang === 'es' ? 'es-US' : 'en-US';
    }

    function translateTimelineTitle(title) {
        if (currentLang !== 'es') {
            return title;
        }
        return TIMELINE_TITLE_ES[title] || title;
    }

    function translateDeliveryStatus(status) {
        if (currentLang !== 'es') {
            return status;
        }
        return DELIVERY_STATUS_ES[status] || status;
    }

    function applyStaticI18n() {
        if (htmlRoot) {
            htmlRoot.lang = currentLang === 'es' ? 'es' : 'en';
        }
        document.title = t('docTitle');

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (key) {
                el.textContent = t(key);
            }
        });

        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-html');
            if (key) {
                el.innerHTML = t(key);
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            const raw = el.getAttribute('data-i18n-attr');
            if (!raw) {
                return;
            }
            raw.split(/\s*\|\s*/).forEach(function (pair) {
                const idx = pair.indexOf(':');
                if (idx === -1) {
                    return;
                }
                const attr = pair.slice(0, idx).trim();
                const key = pair.slice(idx + 1).trim();
                if (attr && key) {
                    el.setAttribute(attr, t(key));
                }
            });
        });

        if (langSelect) {
            langSelect.value = currentLang;
        }

        if (trackingLoaderCard) {
            trackingLoaderCard.setAttribute('aria-label', t('loaderAria'));
        }
    }

    function setLanguage(lang) {
        if (lang !== 'en' && lang !== 'es') {
            return;
        }
        currentLang = lang;
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch (e) {
            /* ignore */
        }
        applyStaticI18n();
        if (trackingResults && trackingResults.style.display === 'block' && lastShownTrackingNumber) {
            const d = trackingDatabase[lastShownTrackingNumber];
            if (d) {
                displayTrackingResults(lastShownTrackingNumber, d);
            }
        }
    }

    function onLangSelectChange() {
        setLanguage(this.value);
    }

    if (langSelect) {
        langSelect.addEventListener('change', onLangSelectChange);
    }

    applyStaticI18n();

    if (homeBelowTrack) {
        homeBelowTrack.querySelectorAll('a').forEach(function (link) {
            link.setAttribute('tabindex', '-1');
        });
    }

    let detailsLiveIntervalId = null;

    function syncBackToTop() {
        if (!backToTop) {
            return;
        }
        if (trackingResults.style.display === 'block') {
            backToTop.hidden = true;
            return;
        }
        backToTop.hidden = window.scrollY < 280;
    }

    ['assets/loading-label.png', 'assets/loading-plane.png', 'assets/loading-logo.png'].forEach(function (src) {
        const im = new Image();
        im.src = src;
    });

    /* FedEx-style: white ring + thin purple stroke, truck profile facing right → */
    const truckSvg =
        '<svg class="tdetail-truck-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<circle cx="16" cy="16" r="14.5" fill="#fff" stroke="#4D148C" stroke-width="1.5"/>' +
        '<rect x="7" y="14" width="10" height="6" rx="0.8" fill="#4D148C"/>' +
        '<path d="M17 15.5h5.2l2.8 3.2V22h-8V15.5z" fill="#4D148C"/>' +
        '<circle cx="11" cy="21.5" r="1.7" fill="#fff" stroke="#4D148C" stroke-width="1.2"/>' +
        '<circle cx="22.5" cy="21.5" r="1.7" fill="#fff" stroke="#4D148C" stroke-width="1.2"/>' +
        '</svg>';

    /* Solid purple circle + white arrow pointing right (matches FedEx mobile) */
    const statusArrowRightSvg =
        '<svg class="tdetails-status-arrow tdetails-status-arrow--right" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">' +
        '<circle cx="11" cy="11" r="11" fill="#4D148C"/>' +
        '<path d="M6.5 11h7.5M11.5 7.5L15 11l-3.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';

    /* Delivered: down arrow (status row + TO step on timeline) */
    const statusArrowDownSvg =
        '<svg class="tdetails-status-arrow tdetails-status-arrow--down" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">' +
        '<circle cx="11" cy="11" r="11" fill="#4D148C"/>' +
        '<path d="M11 6v7M7 10l4 4 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
        '</svg>';

    const toStepArrowSvg =
        '<svg class="tdetail-delivered-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<circle cx="16" cy="16" r="15" fill="#fff" stroke="#4D148C" stroke-width="2"/>' +
        '<path d="M16 10v8M11 14l5 5 5-5" stroke="#4D148C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
        '</svg>';

    function getDeliveryStatusIconHtml(deliveryStatus) {
        return deliveryStatus === 'Delivered' ? statusArrowDownSvg : statusArrowRightSvg;
    }

    const trackingDatabase = {
        '489207548264': {
            status: 'in-transit',
            deliveryStatus: 'Out For Delivery',
            serviceType: 'FedEx Ground',
            estimatedDelivery: 'Friday, 07/10/2026 by end of day',
            deliveryTime: '9:00 PM',
            sender: 'Sara Hutchins',
            receiver: 'Adrian Redmond',
            packageContent: 'Cash and equipments',
            signatureRequired: true,
            fromLocation: '2440 WISCONSIN AVE NW #101, WASHINGTON, DC 20007, USA',
            toLocation: '822 8TH ST, APT T4, LAUREL, MD 20707, USA',
            statusNearPlace: '8500 Ardwick Ardmore Rd, Landover, MD 20785',
            labelCreatedDate: '07/10/2026',
            timeline: [
                {
                    title: 'LABEL CREATED',
                    location: 'FROM 2440 WISCONSIN AVE NW #101, WASHINGTON, DC 20007, USA',
                    date: '07/10/2026 1:45 PM'
                },
                {
                    title: 'PACKAGE RECEIVED BY FEDEX',
                    location: 'WASHINGTON, DC',
                    date: '07/10/2026 2:20 PM'
                },
                {
                    title: 'IN TRANSIT',
                    location: '8500 ARDWICK ARDMORE RD, LANDOVER, MD 20785, USA',
                    date: '07/10/2026 3:45 PM'
                },
                {
                    title: 'OUT FOR DELIVERY',
                    location: '822 8TH ST, APT T4, LAUREL, MD 20707, USA',
                    date: '07/10/2026 5:10 PM'
                }
            ]
        },
        '123456789012': {
            status: 'in-transit',
            deliveryStatus: 'In Transit',
            estimatedDelivery: 'Friday, 11/01/2024 by end of day',
            deliveryTime: '02:00 PM - 4:00 PM',
            sender: 'Amazon Warehouse',
            receiver: 'John Smith',
            packageContent: 'Electronics Package',
            signatureRequired: false,
            fromLocation: '123 WAREHOUSE AVE, SEATTLE, WA 98101, USA',
            toLocation: '789 MAIN ST, NEW YORK, NY 10001',
            labelCreatedDate: '10/30/2024',
            timeline: [
                { title: 'LABEL CREATED', location: 'FROM 123 WAREHOUSE AVE, SEATTLE, WA 98101, USA', date: '10/30/2024 9:00 AM' },
                { title: 'PACKAGE RECEIVED BY FEDEX', location: 'SEATTLE, WA', date: '10/30/2024 2:30 PM' },
                { title: 'IN TRANSIT', location: 'CHICAGO, IL', date: '10/31/2024 6:15 AM' },
                { title: 'OUT FOR DELIVERY', location: 'NEW YORK, NY', date: '11/01/2024 8:30 AM' }
            ]
        },
        '789012345678': {
            status: 'delivered',
            deliveryStatus: 'Delivered',
            estimatedDelivery: 'Thursday, 10/31/2024 by end of day',
            deliveryTime: '10:30 AM',
            sender: 'Apple Store',
            receiver: 'Sarah Johnson',
            packageContent: 'iPhone Package',
            signatureRequired: true,
            fromLocation: '1 APPLE WAY, CUPERTINO, CA 95014, USA',
            toLocation: '456 OAK AVE, BEVERLY HILLS, CA 90210',
            labelCreatedDate: '10/29/2024',
            timeline: [
                { title: 'LABEL CREATED', location: 'FROM 1 APPLE WAY, CUPERTINO, CA 95014, USA', date: '10/29/2024 9:00 AM' },
                { title: 'PACKAGE RECEIVED BY FEDEX', location: 'SAN JOSE, CA', date: '10/29/2024 4:20 PM' },
                { title: 'IN TRANSIT', location: 'LOS ANGELES, CA', date: '10/30/2024 8:30 AM' },
                { title: 'OUT FOR DELIVERY', location: 'BEVERLY HILLS, CA', date: '10/31/2024 8:00 AM' },
                { title: 'DELIVERED', location: 'BEVERLY HILLS, CA', date: '10/31/2024 10:30 AM' }
            ]
        }
    };

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function pad2(n) {
        return String(n).padStart(2, '0');
    }

    /** MM/DD/YYYY — used for “As of” line */
    function formatTodayUs() {
        const d = new Date();
        return pad2(d.getMonth() + 1) + '/' + pad2(d.getDate()) + '/' + d.getFullYear();
    }

    /** MM/DD/YYYY h:mm AM/PM — viewer’s local time (fallback) */
    function formatNowUs() {
        const d = new Date();
        let h = d.getHours();
        const ap = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        if (h === 0) {
            h = 12;
        }
        return (
            pad2(d.getMonth() + 1) +
            '/' +
            pad2(d.getDate()) +
            '/' +
            d.getFullYear() +
            ' ' +
            h +
            ':' +
            pad2(d.getMinutes()) +
            ' ' +
            ap
        );
    }

    /** Parse "…, CITY, ST zip" or "CITY, ST" from FedEx-style location strings */
    function parseUsCityStateFromLocation(loc) {
        let s = String(loc)
            .replace(/^FROM\s+/i, '')
            .trim();
        s = s.replace(/,\s*USA\s*$/i, '');
        const reAddr = /,\s*([^,]+),\s*([A-Z]{2})(?:\s+(\d{5}))?\s*$/i;
        const m = s.match(reAddr);
        if (m) {
            return { city: m[1].trim(), state: m[2].toUpperCase() };
        }
        const reSimple = /^([A-Za-z0-9 .'\-]+),\s*([A-Z]{2})(?:\s+(\d{5}))?\s*$/i;
        const m2 = s.match(reSimple);
        if (m2) {
            return { city: m2[1].trim(), state: m2[2].toUpperCase() };
        }
        return null;
    }

    function formatPlaceLabel(parsed) {
        if (!parsed) {
            return '';
        }
        return parsed.city + ', ' + parsed.state;
    }

    function cityStateTzKey(city, state) {
        return city.replace(/\s+/g, ' ').toUpperCase() + ',' + state;
    }

    /** Cities that don’t match the state default zone (split states, etc.) */
    const CITY_STATE_TZ = {
        'LAUREL,MD': 'America/New_York',
        'WASHINGTON,DC': 'America/New_York',
        'LANDOVER,MD': 'America/New_York',
        'HYATTSVILLE,MD': 'America/New_York',
        'BALTIMORE,MD': 'America/New_York',
        'INDIANAPOLIS,IN': 'America/Indiana/Indianapolis',
        'HIXSON,TN': 'America/New_York',
        'NORCROSS,GA': 'America/New_York',
        'EAST POINT,GA': 'America/New_York',
        'SEATTLE,WA': 'America/Los_Angeles',
        'CHICAGO,IL': 'America/Chicago',
        'NEW YORK,NY': 'America/New_York',
        'CUPERTINO,CA': 'America/Los_Angeles',
        'SAN JOSE,CA': 'America/Los_Angeles',
        'LOS ANGELES,CA': 'America/Los_Angeles',
        'BEVERLY HILLS,CA': 'America/Los_Angeles'
    };

    const US_STATE_TZ = {
        AL: 'America/Chicago',
        AK: 'America/Anchorage',
        AZ: 'America/Phoenix',
        AR: 'America/Chicago',
        CA: 'America/Los_Angeles',
        CO: 'America/Denver',
        CT: 'America/New_York',
        DE: 'America/New_York',
        DC: 'America/New_York',
        FL: 'America/New_York',
        GA: 'America/New_York',
        HI: 'Pacific/Honolulu',
        ID: 'America/Boise',
        IL: 'America/Chicago',
        IN: 'America/Indiana/Indianapolis',
        IA: 'America/Chicago',
        KS: 'America/Chicago',
        KY: 'America/New_York',
        LA: 'America/Chicago',
        ME: 'America/New_York',
        MD: 'America/New_York',
        MA: 'America/New_York',
        MI: 'America/Detroit',
        MN: 'America/Chicago',
        MS: 'America/Chicago',
        MO: 'America/Chicago',
        MT: 'America/Denver',
        NE: 'America/Chicago',
        NV: 'America/Los_Angeles',
        NH: 'America/New_York',
        NJ: 'America/New_York',
        NM: 'America/Denver',
        NY: 'America/New_York',
        NC: 'America/New_York',
        ND: 'America/Chicago',
        OH: 'America/New_York',
        OK: 'America/Chicago',
        OR: 'America/Los_Angeles',
        PA: 'America/New_York',
        RI: 'America/New_York',
        SC: 'America/New_York',
        SD: 'America/Chicago',
        TN: 'America/Chicago',
        TX: 'America/Chicago',
        UT: 'America/Denver',
        VT: 'America/New_York',
        VA: 'America/New_York',
        WA: 'America/Los_Angeles',
        WV: 'America/New_York',
        WI: 'America/Chicago',
        WY: 'America/Denver'
    };

    function resolveIanaTimeZone(locationString) {
        const parsed = parseUsCityStateFromLocation(locationString);
        if (!parsed) {
            return null;
        }
        const key = cityStateTzKey(parsed.city, parsed.state);
        if (CITY_STATE_TZ[key]) {
            return CITY_STATE_TZ[key];
        }
        return US_STATE_TZ[parsed.state] || null;
    }

    function intlPartsInZone(d, timeZone, options) {
        return new Intl.DateTimeFormat(getIntlLocale(), Object.assign({ timeZone: timeZone }, options)).formatToParts(d);
    }

    function partMap(parts) {
        const g = function (t) {
            const p = parts.find(function (x) {
                return x.type === t;
            });
            return p ? p.value : '';
        };
        return g;
    }

    function formatDateInZone(d, timeZone) {
        try {
            const g = partMap(intlPartsInZone(d, timeZone, { month: '2-digit', day: '2-digit', year: 'numeric' }));
            return g('month') + '/' + g('day') + '/' + g('year');
        } catch (e) {
            return formatTodayUs();
        }
    }

    function formatDateTimeInZone(d, timeZone) {
        try {
            const parts = intlPartsInZone(d, timeZone, {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            const g = partMap(parts);
            const ap = (parts.find(function (x) {
                return x.type === 'dayPeriod';
            }) || { value: '' }).value;
            return (
                g('month') +
                '/' +
                g('day') +
                '/' +
                g('year') +
                ' ' +
                g('hour') +
                ':' +
                g('minute') +
                ' ' +
                ap.toUpperCase()
            );
        } catch (e) {
            return formatNowUs();
        }
    }

    function formatTimeInZone(d, timeZone) {
        try {
            const parts = intlPartsInZone(d, timeZone, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            const g = partMap(parts);
            const ap = (parts.find(function (x) {
                return x.type === 'dayPeriod';
            }) || { value: '' }).value;
            return g('hour') + ':' + g('minute') + ' ' + ap.toUpperCase();
        } catch (e) {
            return formatNowUs().replace(/^\d{1,2}\/\d{1,2}\/\d{4}\s+/, '');
        }
    }

    function clearDetailsLiveClock() {
        if (detailsLiveIntervalId !== null) {
            clearInterval(detailsLiveIntervalId);
            detailsLiveIntervalId = null;
        }
    }

    function tickDetailsLiveClock() {
        const d = new Date();
        document.querySelectorAll('.tdetails-live-time').forEach(function (el) {
            const tz = el.getAttribute('data-iana');
            const fmt = el.getAttribute('data-format') || 'datetime';
            if (!tz) {
                return;
            }
            if (fmt === 'time') {
                el.textContent = formatTimeInZone(d, tz);
            } else {
                el.textContent = formatDateTimeInZone(d, tz);
            }
        });
        document.querySelectorAll('.tdetails-live-date').forEach(function (el) {
            const tz = el.getAttribute('data-iana');
            if (!tz) {
                return;
            }
            el.textContent = formatDateInZone(d, tz);
        });
    }

    function startDetailsLiveClock() {
        clearDetailsLiveClock();
        tickDetailsLiveClock();
        detailsLiveIntervalId = setInterval(tickDetailsLiveClock, 30000);
    }

    function parseFirstTrackingNumber(raw) {
        const lines = raw
            .split(/\r?\n/)
            .map(function (s) {
                return s.trim();
            })
            .filter(Boolean);
        if (lines.length) {
            return lines[0].split(',')[0].trim();
        }
        return '';
    }

    function splitEstimatedDelivery(str) {
        const idx = str.indexOf(',');
        if (idx === -1) {
            return { day: str.trim(), rest: '' };
        }
        return {
            day: str.slice(0, idx).trim(),
            rest: str.slice(idx + 1).trim()
        };
    }

    /** Weekday + date + “by end of day” (localized) — viewer’s local calendar */
    function formatEstimatedDeliveryForToday() {
        const d = new Date();
        const weekday = new Intl.DateTimeFormat(getIntlLocale(), { weekday: 'long' }).format(d);
        const dateStr =
            pad2(d.getMonth() + 1) + '/' + pad2(d.getDate()) + '/' + d.getFullYear();
        const suffix = currentLang === 'es' ? 'a última hora del día' : 'by end of day';
        return weekday + ', ' + dateStr + ' ' + suffix;
    }

    function enrichLocationStep(loc) {
        const tz = resolveIanaTimeZone(loc);
        const parsed = parseUsCityStateFromLocation(loc);
        return {
            timeZone: tz,
            placeLabel: parsed ? formatPlaceLabel(parsed) : ''
        };
    }

    function buildSteps(data) {
        const steps = [];
        const fromMeta = enrichLocationStep(data.fromLocation);
        steps.push({
            title: 'FROM',
            location: data.fromLocation,
            date: data.labelCreatedDate,
            timeZone: fromMeta.timeZone,
            placeLabel: fromMeta.placeLabel
        });
        data.timeline.forEach(function (ev) {
            if (ev.title === 'LABEL CREATED') {
                return;
            }
            const loc = ev.location || '';
            const m = enrichLocationStep(loc);
            steps.push({
                title: ev.title,
                location: loc,
                date: ev.date || '',
                timeZone: m.timeZone,
                placeLabel: m.placeLabel
            });
        });
        const toMeta = enrichLocationStep(data.toLocation);
        steps.push({
            title: 'TO',
            location: data.toLocation,
            date: data.estimatedDelivery,
            timeZone: toMeta.timeZone,
            placeLabel: toMeta.placeLabel
        });
        return steps;
    }

    function findCurrentStepIndex(deliveryStatus, steps) {
        if (deliveryStatus === 'Delivered') {
            const toIdx = steps.findIndex(function (s) {
                return s.title === 'TO';
            });
            if (toIdx >= 0) {
                return toIdx;
            }
        }
        const map = {
            'In Transit': 'IN TRANSIT',
            'Out For Delivery': 'OUT FOR DELIVERY'
        };
        const target = map[deliveryStatus];
        if (target) {
            const i = steps.findIndex(function (s) {
                return s.title === target;
            });
            if (i >= 0) {
                return i;
            }
        }
        const j = steps.findIndex(function (s) {
            return s.title === 'IN TRANSIT';
        });
        return j >= 0 ? j : Math.max(0, steps.length - 2);
    }

    function renderTimeline(steps, currentIdx) {
        const n = steps.length;
        const splitPct = Math.min(95, Math.max(8, ((currentIdx + 0.5) / n) * 100));
        let html =
            '<div class="tdetails-timeline" style="--line-split: ' +
            splitPct.toFixed(1) +
            '%" role="list">';

        steps.forEach(function (step, i) {
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            const isFuture = i > currentIdx;
            let rowClass = 'tdetail-step';
            if (isPast) {
                rowClass += ' tdetail-step--past';
            }
            if (isCurrent) {
                rowClass += ' tdetail-step--current';
            }
            if (isFuture) {
                rowClass += ' tdetail-step--future';
            }

            let marker;
            if (isCurrent) {
                if (step.title === 'TO') {
                    marker = '<div class="tdetail-marker tdetail-marker--delivered">' + toStepArrowSvg + '</div>';
                } else {
                    marker = '<div class="tdetail-marker tdetail-marker--truck">' + truckSvg + '</div>';
                }
            } else if (isPast) {
                marker = '<div class="tdetail-marker tdetail-marker--dot tdetail-marker--dot-on"></div>';
            } else {
                marker = '<div class="tdetail-marker tdetail-marker--dot tdetail-marker--dot-off"></div>';
            }

            let dateLine;
            if (isCurrent && step.timeZone) {
                dateLine =
                    '<span class="tdetails-live-time" data-iana="' +
                    escapeHtml(step.timeZone) +
                    '" data-format="datetime">' +
                    escapeHtml(formatDateTimeInZone(new Date(), step.timeZone)) +
                    '</span>';
            } else if (isCurrent) {
                dateLine = escapeHtml(formatNowUs());
            } else if (step.title === 'FROM') {
                dateLine = escapeHtml(t('labelCreatedPrefix')) + escapeHtml(step.date);
            } else {
                dateLine = escapeHtml(step.date);
            }

            const titleShown = translateTimelineTitle(step.title);

            html +=
                '<div class="' +
                rowClass +
                '" role="listitem">' +
                marker +
                '<div class="tdetail-step-body">' +
                '<div class="tdetail-step-title">' +
                escapeHtml(titleShown) +
                '</div>' +
                (step.location
                    ? '<div class="tdetail-step-loc">' + escapeHtml(step.location) + '</div>'
                    : '') +
                '<div class="tdetail-step-date">' +
                dateLine +
                '</div>' +
                '</div>' +
                '</div>';
        });

        html += '</div>';
        return html;
    }

    function displayTrackingResults(trackingNumber, data) {
        lastShownTrackingNumber = trackingNumber;

        if (trackingSection) {
            trackingSection.style.display = 'none';
        }
        if (homeBelowTrack) {
            homeBelowTrack.style.display = 'none';
        }
        mainMain.classList.remove('m-main--web-home');
        mainMain.classList.add('m-main--details');
        mobileShell.classList.add('mobile-shell--details');

        trackingResults.style.display = 'block';
        window.scrollTo(0, 0);
        syncBackToTop();

        const estimatedLine = formatEstimatedDeliveryForToday();
        const sched = splitEstimatedDelivery(estimatedLine);
        const steps = buildSteps(Object.assign({}, data, { estimatedDelivery: estimatedLine }));
        const currentIdx = findCurrentStepIndex(data.deliveryStatus, steps);

        const senderHtml = escapeHtml(data.sender).replace(/\n/g, '<br>');
        const receiverHtml = escapeHtml(data.receiver).replace(/\n/g, '<br>');

        const toParsed = parseUsCityStateFromLocation(data.toLocation);
        const toTz = resolveIanaTimeZone(data.toLocation);
        const statusNear =
            data.statusNearPlace || (toParsed ? formatPlaceLabel(toParsed) : '');
        let asofBlock;
        if (toTz && statusNear) {
            asofBlock =
                '<div class="tdetails-asof">' +
                escapeHtml(t('asOf')) +
                ' <span class="tdetails-live-time" data-iana="' +
                escapeHtml(toTz) +
                '" data-format="datetime">' +
                escapeHtml(formatDateTimeInZone(new Date(), toTz)) +
                '</span></div>' +
                '<div class="tdetails-local-now">' +
                '<span class="tdetails-local-now-label">' +
                escapeHtml(t('lastUpdatedAt')) +
                '</span> ' +
                '<span class="tdetails-asof-place">' +
                escapeHtml(statusNear) +
                '</span></div>';
        } else if (toTz) {
            asofBlock =
                '<div class="tdetails-asof">' +
                escapeHtml(t('asOf')) +
                ' <span class="tdetails-live-time" data-iana="' +
                escapeHtml(toTz) +
                '" data-format="datetime">' +
                escapeHtml(formatDateTimeInZone(new Date(), toTz)) +
                '</span></div>';
        } else {
            asofBlock =
                '<div class="tdetails-asof">' + escapeHtml(t('asOf')) + ' ' + escapeHtml(formatTodayUs()) + '</div>';
        }

        tdetailsInner.innerHTML =
            '<div class="tdetails-scheduled">' +
            '<div class="tdetails-scheduled-label">' +
            escapeHtml(t('scheduledDelivery')) +
            '</div>' +
            '<div class="tdetails-scheduled-day">' +
            escapeHtml(sched.day) +
            '</div>' +
            (sched.rest ? '<div class="tdetails-scheduled-sub">' + escapeHtml(sched.rest) + '</div>' : '') +
            '<div class="tdetails-est-window">' +
            (data.deliveryStatus === 'Delivered'
                ? escapeHtml(data.deliveryTime)
                : data.deliveryTime.indexOf('-') === -1
                  ? escapeHtml(t('deliveryBy')) + ' ' + escapeHtml(data.deliveryTime)
                  : escapeHtml(t('estimatedBetween')) + ' ' + escapeHtml(data.deliveryTime)) +
            '</div>' +
            asofBlock +
            '</div>' +
            '<div class="tdetails-divider"></div>' +
            '<div class="tdetails-ship">' +
            '<div class="tdetails-field"><div class="tdetails-field-label">' +
            escapeHtml(t('senderName')) +
            '</div><div class="tdetails-field-value">' +
            senderHtml +
            '</div></div>' +
            '<div class="tdetails-field"><div class="tdetails-field-label">' +
            escapeHtml(t('receiverName')) +
            '</div><div class="tdetails-field-value">' +
            receiverHtml +
            '</div></div>' +
            '<div class="tdetails-field"><div class="tdetails-field-label">' +
            escapeHtml(t('packageContent')) +
            '</div><div class="tdetails-field-value">' +
            escapeHtml(data.packageContent) +
            '</div></div>' +
            '<p class="tdetails-signature">' +
            escapeHtml(data.signatureRequired ? t('sigRequired') : t('sigNotRequired')) +
            '</p>' +
            '<span class="tdetails-pill">' +
            escapeHtml(t('onTime')) +
            '</span>' +
            '</div>' +
            '<div class="tdetails-divider"></div>' +
            '<div class="tdetails-status-block">' +
            '<div class="tdetails-delivery-row">' +
            '<span class="tdetails-delivery-label">' +
            escapeHtml(t('deliveryStatus')) +
            '</span>' +
            '<span class="tdetails-delivery-value">' +
            escapeHtml(translateDeliveryStatus(data.deliveryStatus)) +
            '</span>' +
            getDeliveryStatusIconHtml(data.deliveryStatus) +
            '</div>' +
            '<div class="tdetails-tid">' +
            '<div class="tdetails-tid-label">' +
            escapeHtml(t('trackingId')) +
            '</div>' +
            '<div class="tdetails-tid-num">' +
            escapeHtml(trackingNumber) +
            '</div>' +
            '</div>' +
            (data.serviceType
                ? '<div class="tdetails-service-row">' +
                  '<span class="tdetails-service-label">' +
                  escapeHtml(t('serviceLabel')) +
                  '</span>' +
                  '<span class="tdetails-service-value">' +
                  escapeHtml(data.serviceType) +
                  '</span></div>'
                : '') +
            '</div>' +
            renderTimeline(steps, currentIdx);

        startDetailsLiveClock();

        trackingResults.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    if (trackButton) {
        trackButton.addEventListener('click', handleTracking);
    }

    if (newSearchBtn) {
        newSearchBtn.addEventListener('click', function () {
            resetTracking();
        });
    }

    if (logoHome) {
        logoHome.addEventListener('click', function (e) {
            e.preventDefault();
            if (trackingResults.style.display === 'block') {
                resetTracking();
            }
        });
    }

    function runTrackingLoadSequence(onDone) {
        if (!trackingLoader || typeof onDone !== 'function') {
            onDone();
            return;
        }

        /* ~3.1s total: readable each step, faster than old ~4.3s, not a flash */
        const labelMs = 900;
        const planeMs = 1580;
        const logoMs = 650;
        const timerIds = [];

        function arm(fn, ms) {
            timerIds.push(setTimeout(fn, ms));
        }

        trackingLoader.hidden = false;
        trackingLoader.setAttribute('aria-hidden', 'false');
        trackingLoader.className = 'tracking-loader is-step-label';

        arm(function () {
            trackingLoader.classList.remove('is-step-label');
            trackingLoader.classList.add('is-step-plane');
            arm(function () {
                trackingLoader.classList.add('is-plane-flying');
            }, 250);
        }, labelMs);

        arm(function () {
            trackingLoader.classList.remove('is-step-plane', 'is-plane-flying');
            trackingLoader.classList.add('is-step-logo');
        }, labelMs + planeMs);

        arm(function () {
            timerIds.forEach(function (id) {
                clearTimeout(id);
            });
            trackingLoader.hidden = true;
            trackingLoader.setAttribute('aria-hidden', 'true');
            trackingLoader.className = 'tracking-loader';
            onDone();
        }, labelMs + planeMs + logoMs);
    }

    function handleTracking() {
        const trackingNumber = parseFirstTrackingNumber(trackingInput ? trackingInput.value : '');

        if (!trackingNumber) {
            showNotification(t('notifEmpty'), 'error');
            return;
        }

        const trackingData = trackingDatabase[trackingNumber];
        if (!trackingData) {
            showNotification(t('notifWrong'), 'error');
            return;
        }

        const originalLabel = trackButton ? trackButton.textContent : '';
        if (trackButton) {
            trackButton.textContent = '…';
            trackButton.disabled = true;
        }

        runTrackingLoadSequence(function () {
            if (trackButton) {
                trackButton.textContent = originalLabel;
                trackButton.disabled = false;
            }
            const lines = trackingInput.value
                .split(/\r?\n/)
                .map(function (s) {
                    return s.trim();
                })
                .filter(Boolean);
            if (lines.length > 1) {
                showNotification(t('notifMulti'), 'info');
            }
            displayTrackingResults(trackingNumber, trackingData);
        });
    }

    function resetTracking() {
        lastShownTrackingNumber = null;
        clearDetailsLiveClock();
        trackingResults.style.display = 'none';
        if (trackingSection) {
            trackingSection.style.display = 'block';
        }
        if (homeBelowTrack) {
            homeBelowTrack.style.display = '';
        }
        mainMain.classList.add('m-main--web-home');
        mainMain.classList.remove('m-main--details');
        mobileShell.classList.remove('mobile-shell--details');
        if (trackingInput) {
            trackingInput.value = '';
            trackingInput.focus();
        }
        syncBackToTop();
    }

    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const validTypes = ['success', 'error', 'info', 'default'];
        const t = validTypes.indexOf(type) !== -1 ? type : 'default';

        const notification = document.createElement('div');
        notification.className = 'notification notification-' + t;
        notification.textContent = message;
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', t === 'error' ? 'assertive' : 'polite');
        notification.setAttribute('aria-atomic', 'true');

        document.body.appendChild(notification);

        requestAnimationFrame(function () {
            notification.classList.add('notification--visible');
        });

        setTimeout(function () {
            notification.classList.remove('notification--visible');
            setTimeout(function () {
                notification.remove();
            }, 280);
        }, 3800);
    }

    const needHelpLink = document.getElementById('needHelpLink');
    if (needHelpLink) {
        needHelpLink.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification(t('needHelpToast'), 'info');
        });
    }

    window.addEventListener('scroll', syncBackToTop, { passive: true });
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    syncBackToTop();

    const touchSelectors =
        '.m-btn-track, .m-icon-btn, .tdetails-new-search, .m-btn-pill-outline, .m-footer-social, #langSelect';
    document.querySelectorAll(touchSelectors).forEach(function (el) {
        el.addEventListener('touchstart', function () {
            this.style.opacity = '0.75';
        });
        el.addEventListener('touchend', function () {
            this.style.opacity = '1';
        });
    });
});
