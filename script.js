document.addEventListener('DOMContentLoaded', function () {
    const trackingInput = document.getElementById('trackingInput');
    const trackButton = document.getElementById('trackButton');
    const trackingResults = document.getElementById('trackingResults');
    const newSearchBtn = document.getElementById('newSearch');
    const trackingSection = document.getElementById('tracking');
    const homeBelowTrack = document.getElementById('homeBelowTrack');
    const mainMain = document.getElementById('mainMain');
    const mobileShell = document.getElementById('mobileShell');
    const logoHome = document.getElementById('logoHome');
    const fxLogoHome = document.getElementById('fxLogoHome');
    const trackingLoader = document.getElementById('trackingLoader');
    const backToTop = document.getElementById('backToTop');
    const langSelect = document.getElementById('langSelect');
    const trackingLoaderCard = document.getElementById('trackingLoaderCard');
    const htmlRoot = document.getElementById('htmlRoot');
    const viewStatus = document.getElementById('viewStatus');
    const viewDetails = document.getElementById('viewDetails');
    const globalHeader = document.getElementById('globalHeader');

    const LANG_STORAGE_KEY = 'fedex-track-lang';
    let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
    if (currentLang !== 'en' && currentLang !== 'es') {
        currentLang = 'en';
    }
    let lastShownTrackingNumber = null;
    let resultsViewMode = 'status';

    const TIMELINE_TITLE_ES = {
        FROM: 'DESDE',
        TO: 'HACIA',
        'LABEL CREATED': 'ETIQUETA CREADA',
        'PACKAGE RECEIVED BY FEDEX': 'PAQUETE RECIBIDO POR FEDEX',
        'IN TRANSIT': 'EN TRÁNSITO',
        'OUT FOR DELIVERY': 'EN REPARTO',
        'DELIVERY EXCEPTION': 'EXCEPCIÓN DE ENTREGA',
        DELIVERED: 'ENTREGADO'
    };

    const DELIVERY_STATUS_ES = {
        'Label Created': 'Etiqueta creada',
        'In Transit': 'En tránsito',
        Delivered: 'Entregado',
        'Out For Delivery': 'En reparto',
        'Delivery Exception': 'Excepción de entrega'
    };

    const EVENT_STATUS_ES = {
        'Shipment information sent to FedEx': 'Información de envío enviada a FedEx',
        'Picked up': 'Recogido',
        'Left FedEx origin facility': 'Salió de la instalación de origen de FedEx',
        'Arrived at FedEx hub': 'Llegó al centro de FedEx',
        'On the way': 'En camino',
        'At local FedEx facility': 'En la instalación local de FedEx',
        'On FedEx vehicle for delivery': 'En vehículo de FedEx para entrega',
        'Delivery exception': 'Excepción de entrega',
        'Shipment on hold': 'Envío en espera',
        Delivered: 'Entregado'
    };

    const STR = {
        en: {
            docTitle: 'Package Tracking',
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
            deliveryPending: 'Pending',
            asOf: 'As of',
            lastUpdatedAt: 'Last updated at',
            serviceLabel: 'SERVICE',
            senderName: "Sender's Name",
            receiverName: "Receiver's Name",
            packageContent: 'Package Content',
            sigRequired: 'Signature required',
            sigNotRequired: 'No signature required',
            onTime: 'ON TIME',
            delayed: 'ON HOLD',
            deliveryStatus: 'DELIVERY STATUS',
            trackingId: 'TRACKING ID',
            labelCreatedPrefix: 'Label created ',
            notifEmpty: 'Please enter a tracking number',
            notifWrong: 'Please enter the correct tracking number',
            notifMulti: 'Showing results for the first number only.',
            needHelpToast:
                'Tracking numbers are often 12 digits and appear on your receipt or shipping confirmation email.',
            copyrightLine: '© FedEx 1995–2026',
            signUpOrLogIn: 'Sign Up or Log In',
            viewMoreDetails: 'View more details',
            manageDelivery: 'Manage delivery',
            getStatusUpdates: 'Get status updates',
            fromLabel: 'From',
            toLabel: 'To',
            travelHistory: 'Travel history',
            travelHelp:
                "You're viewing the most updated information to help minimize the need for customer support.",
            shipmentFacts: 'Shipment facts',
            shipmentOverview: 'Shipment overview',
            servicesLabel: 'Services',
            packageDetails: 'Package details',
            askFedEx: 'Ask FedEx',
            askFedExAria: 'Ask FedEx',
            copyTrackAria: 'Copy tracking number',
            backAria: 'Back',
            shareAria: 'Share',
            moreAria: 'More',
            currentlyIn: 'Currently in',
            statusDeliveryUpdated: 'Delivery updated',
            statusOnTheWay: 'On the way',
            statusOutForDelivery: 'Out for delivery',
            statusDelivered: 'Delivered',
            statusLabelCreated: 'Label created',
            statusException: 'Delivery exception',
            heroInTransit: 'Your package is on its way.',
            heroOutForDelivery: 'Your package is out for delivery.',
            heroDelivered: 'Your package was delivered.',
            heroLabelCreated: 'Shipment information sent to FedEx.',
            heroHoldDefault:
                "Your package is still on the way and we're actively working to get you a new delivery date.",
            trackingNumberLabel: 'Tracking number',
            shipDateLabel: 'Ship date',
            deliveryDetailsLabel: 'Delivery details',
            termsLabel: 'Terms',
            specialHandlingLabel: 'Special handling section',
            weightLabel: 'Weight',
            totalPiecesLabel: 'Total pieces',
            packagingLabel: 'Packaging',
            willUpdateSoon: 'Will be updated soon',
            termsShipper: 'Third Party',
            specialHandlingDefault: 'Deliver Weekday, Residential Delivery',
            totalPiecesDefault: '1',
            packagingDefault: 'FedEx Envelope',
            weightDefault: '0.5 lbs / 0.23 kgs',
            totalShipmentWeightLabel: 'Total shipment weight',
            copiedToast: 'Tracking number copied',
            footerOurCompany: 'Our company',
            footerMoreFrom: 'More from FedEx',
            footerPolicy: 'Policy center',
            footerContact: 'Contact Us',
            footerTerms: 'Terms of Use',
            footerPrivacySecurity: 'Privacy & Security',
            footerAdChoices: 'Ad Choices',
            footerPrivacyChoices: 'Your Privacy Choices',
            footerSitemap: 'Site Map',
            footerCookieConsent: 'Cookie Consent'
        },
        es: {
            docTitle: 'Rastreo de paquetes',
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
            deliveryPending: 'Pendiente',
            asOf: 'A partir del',
            lastUpdatedAt: 'Última actualización en',
            serviceLabel: 'SERVICIO',
            senderName: 'Nombre del remitente',
            receiverName: 'Nombre del destinatario',
            packageContent: 'Contenido del paquete',
            sigRequired: 'Se requiere firma',
            sigNotRequired: 'No se requiere firma',
            onTime: 'A TIEMPO',
            delayed: 'EN ESPERA',
            deliveryStatus: 'ESTADO DE ENTREGA',
            trackingId: 'ID DE RASTREO',
            labelCreatedPrefix: 'Etiqueta creada el ',
            notifEmpty: 'Ingrese un número de rastreo',
            notifWrong: 'Ingrese un número de rastreo correcto',
            notifMulti: 'Se muestran resultados solo para el primer número.',
            needHelpToast:
                'Los números de rastreo suelen tener 12 dígitos y aparecen en su recibo o correo de confirmación de envío.',
            copyrightLine: '© FedEx 1995–2026',
            signUpOrLogIn: 'Regístrese o inicie sesión',
            viewMoreDetails: 'Ver más detalles',
            manageDelivery: 'Administrar entrega',
            getStatusUpdates: 'Recibir actualizaciones de estado',
            fromLabel: 'Desde',
            toLabel: 'Hacia',
            travelHistory: 'Historial de viaje',
            travelHelp:
                'Está viendo la información más actualizada para minimizar la necesidad de soporte.',
            shipmentFacts: 'Datos del envío',
            shipmentOverview: 'Resumen del envío',
            servicesLabel: 'Servicios',
            packageDetails: 'Detalles del paquete',
            askFedEx: 'Preguntar a FedEx',
            askFedExAria: 'Preguntar a FedEx',
            copyTrackAria: 'Copiar número de rastreo',
            backAria: 'Volver',
            shareAria: 'Compartir',
            moreAria: 'Más',
            currentlyIn: 'Actualmente en',
            statusDeliveryUpdated: 'Entrega actualizada',
            statusOnTheWay: 'En camino',
            statusOutForDelivery: 'En reparto',
            statusDelivered: 'Entregado',
            statusLabelCreated: 'Etiqueta creada',
            statusException: 'Excepción de entrega',
            heroInTransit: 'Su paquete está en camino.',
            heroOutForDelivery: 'Su paquete está en reparto.',
            heroDelivered: 'Su paquete fue entregado.',
            heroLabelCreated: 'Información de envío enviada a FedEx.',
            heroHoldDefault:
                'Su paquete sigue en camino y estamos trabajando activamente para obtener una nueva fecha de entrega.',
            trackingNumberLabel: 'Número de rastreo',
            shipDateLabel: 'Fecha de envío',
            deliveryDetailsLabel: 'Detalles de entrega',
            termsLabel: 'Términos',
            specialHandlingLabel: 'Sección de manejo especial',
            weightLabel: 'Peso',
            totalPiecesLabel: 'Piezas totales',
            packagingLabel: 'Embalaje',
            willUpdateSoon: 'Se actualizará pronto',
            termsShipper: 'Tercero',
            specialHandlingDefault: 'Entrega entre semana, entrega residencial',
            totalPiecesDefault: '1',
            packagingDefault: 'Sobre FedEx',
            weightDefault: '0.5 lbs / 0.23 kgs',
            totalShipmentWeightLabel: 'Peso total del envío',
            copiedToast: 'Número de rastreo copiado',
            footerOurCompany: 'Nuestra compañía',
            footerMoreFrom: 'Más de FedEx',
            footerPolicy: 'Centro de políticas',
            footerContact: 'Contáctenos',
            footerTerms: 'Términos de uso',
            footerPrivacySecurity: 'Privacidad y seguridad',
            footerAdChoices: 'Opciones de anuncios',
            footerPrivacyChoices: 'Sus opciones de privacidad',
            footerSitemap: 'Mapa del sitio',
            footerCookieConsent: 'Consentimiento de cookies'
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

    const I18N_HTML_KEYS = {
        trackTitle: true,
        promo1Html: true,
        promo2Html: true,
        supportLeadHtml: true
    };

    function trustedI18nHtml(html) {
        return String(html)
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
    }

    function sanitizeTrackingToken(value) {
        return String(value)
            .replace(/[^\dA-Za-z]/g, '')
            .slice(0, 30);
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
            if (key && I18N_HTML_KEYS[key]) {
                el.innerHTML = trustedI18nHtml(t(key));
            } else if (key) {
                el.textContent = t(key);
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
        if (isResultsVisible() && lastShownTrackingNumber) {
            const d = trackingDatabase[lastShownTrackingNumber];
            if (d) {
                displayTrackingResults(lastShownTrackingNumber, d, resultsViewMode);
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
    let lastScanStageIdx = null;

    function parseUsDateTimeInZone(dateStr, timeZone) {
        const m = String(dateStr || '')
            .trim()
            .match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*(AM|PM))?$/i);
        if (!m) {
            return null;
        }
        const year = Number(m[3]);
        const month = Number(m[1]);
        const day = Number(m[2]);
        let hour = 0;
        let minute = 0;
        if (m[4]) {
            hour = Number(m[4]);
            minute = Number(m[5]);
            const ap = String(m[6]).toUpperCase();
            if (ap === 'AM') {
                if (hour === 12) {
                    hour = 0;
                }
            } else if (hour !== 12) {
                hour += 12;
            }
        }
        const tz = timeZone || 'UTC';
        const fmt = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        function zoneParts(d) {
            const map = {};
            fmt.formatToParts(d).forEach(function (p) {
                if (p.type !== 'literal') {
                    map[p.type] = p.value;
                }
            });
            return map;
        }
        let utc = Date.UTC(year, month - 1, day, hour, minute, 0);
        for (let i = 0; i < 4; i++) {
            const p = zoneParts(new Date(utc));
            let shownHour = Number(p.hour);
            if (shownHour === 24) {
                shownHour = 0;
            }
            const asWanted = Date.UTC(year, month - 1, day, hour, minute, 0);
            const asShown = Date.UTC(
                Number(p.year),
                Number(p.month) - 1,
                Number(p.day),
                shownHour,
                Number(p.minute),
                Number(p.second || 0)
            );
            utc += asWanted - asShown;
        }
        return new Date(utc);
    }

    function deliveryStatusFromScanTitle(title) {
        if (title === 'DELIVERED' || title === 'TO') {
            return 'Delivered';
        }
        if (title === 'OUT FOR DELIVERY') {
            return 'Out For Delivery';
        }
        if (title === 'DELIVERY EXCEPTION') {
            return 'Delivery Exception';
        }
        /* Before pickup: label only — not In Transit yet */
        if (title === 'FROM' || title === 'LABEL CREATED') {
            return 'Label Created';
        }
        return 'In Transit';
    }

    function formatStatusNearFromLocation(loc) {
        const cleaned = String(loc || '')
            .replace(/^FROM\s+/i, '')
            .replace(/,\s*USA$/i, '')
            .replace(/,\s*SOUTH AFRICA$/i, '')
            .trim();
        const parsed = parseUsCityStateFromLocation(cleaned);
        if (parsed) {
            return formatPlaceLabel(parsed);
        }
        const u = cleaned.toUpperCase();
        if (u.indexOf('CAPE TOWN') >= 0) {
            return 'Cape Town, South Africa';
        }
        if (u.indexOf('JOHANNESBURG') >= 0) {
            return 'Johannesburg, South Africa';
        }
        if (u.indexOf('MEMPHIS') >= 0) {
            return 'Memphis, TN';
        }
        if (u.indexOf('BRONX') >= 0) {
            return 'Bronx, NY';
        }
        if (u.indexOf('AMITE') >= 0) {
            return 'Amite, LA';
        }
        if (u.indexOf('NEW ORLEANS') >= 0) {
            return 'New Orleans, LA';
        }
        if (u.indexOf('COLUMBUS') >= 0) {
            return 'Columbus, OH';
        }
        if (u.indexOf('PITTSBURGH') >= 0) {
            return 'Pittsburgh, PA';
        }
        if (u.indexOf('TEMPLETON') >= 0) {
            return 'Templeton, PA';
        }
        if (u.indexOf('CHICAGO') >= 0 || u.indexOf('DIVISION') >= 0) {
            return 'Chicago, IL';
        }
        if (u.indexOf('DALLAS') >= 0) {
            return 'Dallas, TX';
        }
        if (u.indexOf('FAIRFIELD') >= 0 || u.indexOf('STILLSON') >= 0) {
            return 'Fairfield, CT';
        }
        if (u.indexOf('HARTFORD') >= 0) {
            return 'Hartford, CT';
        }
        if (u.indexOf('SPRINGFIELD') >= 0) {
            return 'Springfield, MA';
        }
        if (u.indexOf('SAFETY HARBOR') >= 0) {
            return 'Safety Harbor, FL';
        }
        if (u.indexOf('CLEARWATER') >= 0) {
            return 'Clearwater, FL';
        }
        if (u.indexOf('TAMPA') >= 0 || u.indexOf('KNOLLWOOD') >= 0) {
            return 'Tampa, FL';
        }
        if (u.indexOf('ORLANDO') >= 0 || u.indexOf('DIRECTORS ROW') >= 0) {
            return 'Orlando, FL';
        }
        if (u.indexOf('JACKSONVILLE') >= 0 || u.indexOf('PRITCHARD') >= 0) {
            return 'Jacksonville, FL';
        }
        if (u.indexOf('LUTZ') >= 0) {
            return 'Lutz, FL';
        }
        return cleaned;
    }

    function locationMatchToken(loc) {
        const u = String(loc || '').toUpperCase();
        if (u.indexOf('BLYTHE') >= 0) {
            return 'BLYTHE';
        }
        if (u.indexOf('INDIO') >= 0) {
            return 'INDIO';
        }
        if (u.indexOf('SAN DIEGO') >= 0) {
            return 'SAN DIEGO';
        }
        if (u.indexOf('RAYMOND') >= 0) {
            return 'RAYMOND';
        }
        if (u.indexOf('PHOENIX') >= 0) {
            return 'PHOENIX';
        }
        if (u.indexOf('LANDOVER') >= 0 || u.indexOf('ARDWICK') >= 0) {
            return 'LANDOVER';
        }
        if (u.indexOf('HYATTSVILLE') >= 0) {
            return 'HYATTSVILLE';
        }
        if (u.indexOf('LAUREL') >= 0) {
            return 'LAUREL';
        }
        if (u.indexOf('WASHINGTON') >= 0 || u.indexOf('WISCONSIN') >= 0) {
            return 'WASHINGTON';
        }
        if (u.indexOf('CAPE TOWN') >= 0 || u.indexOf('IHLATHI') >= 0 || u.indexOf('MANNINGFORD') >= 0) {
            return 'CAPE TOWN';
        }
        if (u.indexOf('JOHANNESBURG') >= 0) {
            return 'JOHANNESBURG';
        }
        if (u.indexOf('MEMPHIS') >= 0) {
            return 'MEMPHIS';
        }
        if (u.indexOf('BRONX') >= 0 || u.indexOf('WEBSTER') >= 0) {
            return 'BRONX';
        }
        if (u.indexOf('AMITE') >= 0 || u.indexOf('HWY 16') >= 0) {
            return 'AMITE';
        }
        if (u.indexOf('NEW ORLEANS') >= 0) {
            return 'NEW ORLEANS';
        }
        if (u.indexOf('TEMPLETON') >= 0 || u.indexOf('MADISON RD') >= 0) {
            return 'TEMPLETON';
        }
        if (u.indexOf('PITTSBURGH') >= 0) {
            return 'PITTSBURGH';
        }
        if (u.indexOf('COLUMBUS') >= 0 || u.indexOf('LYNNHAVEN') >= 0 || u.indexOf('GEORGESVILLE') >= 0 || u.indexOf('WESTBELT') >= 0 || u.indexOf('MANOLA') >= 0 || u.indexOf('INTERNATIONAL ST') >= 0 || u.indexOf('POTH') >= 0) {
            return 'COLUMBUS';
        }
        if (u.indexOf('CHICAGO') >= 0 || u.indexOf('DIVISION') >= 0) {
            return 'CHICAGO';
        }
        if (u.indexOf('DALLAS') >= 0 || u.indexOf('MAIN ST') >= 0) {
            return 'DALLAS';
        }
        if (u.indexOf('FAIRFIELD') >= 0 || u.indexOf('STILLSON') >= 0) {
            return 'FAIRFIELD';
        }
        if (u.indexOf('HARTFORD') >= 0) {
            return 'HARTFORD';
        }
        if (u.indexOf('SPRINGFIELD') >= 0) {
            return 'SPRINGFIELD';
        }
        if (u.indexOf('SAFETY HARBOR') >= 0) {
            return 'SAFETY HARBOR';
        }
        if (u.indexOf('CLEARWATER') >= 0 || u.indexOf('49TH ST') >= 0) {
            return 'CLEARWATER';
        }
        if (u.indexOf('TAMPA') >= 0 || u.indexOf('KNOLLWOOD') >= 0) {
            return 'TAMPA';
        }
        if (u.indexOf('ORLANDO') >= 0 || u.indexOf('DIRECTORS ROW') >= 0) {
            return 'ORLANDO';
        }
        if (u.indexOf('JACKSONVILLE') >= 0 || u.indexOf('PRITCHARD') >= 0) {
            return 'JACKSONVILLE';
        }
        if (u.indexOf('LUTZ') >= 0) {
            return 'LUTZ';
        }
        return u.split(',')[0].trim();
    }

    /** Pin out-for-delivery to the destination's local calendar day (today). */
    function resolveTrackingDataForDisplay(data) {
        if (!data.outForDeliveryToday) {
            return data;
        }
        const tz = resolveIanaTimeZone(data.toLocation) || 'America/New_York';
        const now = new Date();
        const weekday = new Intl.DateTimeFormat(getIntlLocale(), { weekday: 'long', timeZone: tz }).format(now);
        const dateStr = formatDateInZone(now, tz);
        const suffix = currentLang === 'es' ? 'a última hora del día' : 'by end of day';
        const timeline = (data.timeline || []).map(function (ev) {
            if (ev.title === 'OUT FOR DELIVERY') {
                return Object.assign({}, ev, {
                    date: dateStr + ' 6:30 AM'
                });
            }
            return ev;
        });
        return Object.assign({}, data, {
            deliveryStatus: 'Out For Delivery',
            estimatedDelivery: weekday + ', ' + dateStr + ' ' + suffix,
            statusNearPlace: formatStatusNearFromLocation(data.toLocation),
            timeline: timeline,
            _outForDeliveryScanAt: dateStr + ' 12:01 AM',
            _outForDeliveryTz: tz
        });
    }

    function applyOutForDeliveryTodayScan(data) {
        if (!data._outForDeliveryScanAt || !data._outForDeliveryTz) {
            return data;
        }
        const timeline = (data.timeline || []).map(function (ev) {
            if (ev.title === 'OUT FOR DELIVERY') {
                return Object.assign({}, ev, {
                    date: data._outForDeliveryScanAt
                });
            }
            return ev;
        });
        const patched = Object.assign({}, data, { timeline: timeline });
        delete patched._outForDeliveryScanAt;
        delete patched._outForDeliveryTz;
        return patched;
    }

    function findStepIndexForRouteStage(steps, stage) {
        if (!stage || !stage.stepTitle) {
            return -1;
        }
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].title !== stage.stepTitle) {
                continue;
            }
            if (
                stage.locationIncludes &&
                String(steps[i].location || '')
                    .toUpperCase()
                    .indexOf(String(stage.locationIncludes).toUpperCase()) === -1
            ) {
                continue;
            }
            return i;
        }
        return -1;
    }

    /** FedEx-style: advance only when each scan's real date/time has passed. */
    function applyScanTimelineProgress(data) {
        const fallbackTz =
            resolveIanaTimeZone(data.fromLocation) ||
            resolveIanaTimeZone(data.toLocation) ||
            'America/Phoenix';
        const scans = [];
        let labelDate = data.labelCreatedDate;
        if (data.timeline && data.timeline.length && data.timeline[0].title === 'LABEL CREATED') {
            labelDate = data.timeline[0].date || labelDate;
        }
        scans.push({
            stepTitle: 'FROM',
            location: data.fromLocation,
            locationIncludes: null,
            at: parseUsDateTimeInZone(labelDate, fallbackTz)
        });
        (data.timeline || []).forEach(function (ev) {
            if (ev.title === 'LABEL CREATED') {
                return;
            }
            const evTz = resolveIanaTimeZone(ev.location) || fallbackTz;
            scans.push({
                stepTitle: ev.title,
                location: ev.location,
                locationIncludes: locationMatchToken(ev.location),
                at: parseUsDateTimeInZone(ev.date, evTz)
            });
        });

        const now = Date.now();
        let latest = 0;
        for (let i = 0; i < scans.length; i++) {
            if (scans[i].at && scans[i].at.getTime() <= now) {
                latest = i;
            }
        }
        const scan = scans[latest];
        return {
            data: Object.assign({}, data, {
                deliveryStatus: deliveryStatusFromScanTitle(scan.stepTitle),
                statusNearPlace: formatStatusNearFromLocation(scan.location)
            }),
            stageIdx: latest,
            stage: {
                stepTitle: scan.stepTitle,
                locationIncludes:
                    scan.stepTitle === 'IN TRANSIT' || scan.stepTitle === 'OUT FOR DELIVERY'
                        ? scan.locationIncludes
                        : null
            }
        };
    }

    function syncBackToTop() {
        if (!backToTop) {
            return;
        }
        if (isResultsVisible()) {
            backToTop.hidden = true;
            return;
        }
        backToTop.hidden = window.scrollY < 280;
    }

    function isResultsVisible() {
        return !!(trackingResults && trackingResults.classList.contains('is-visible'));
    }

    function showResultsPanel() {
        if (!trackingResults) {
            return;
        }
        trackingResults.hidden = false;
        trackingResults.removeAttribute('hidden');
        trackingResults.style.display = 'flex';
        trackingResults.classList.add('is-visible');
        document.body.classList.add('is-fx-results');
    }

    function hideResultsPanel() {
        if (!trackingResults) {
            return;
        }
        trackingResults.hidden = true;
        trackingResults.setAttribute('hidden', '');
        trackingResults.style.display = 'none';
        trackingResults.classList.remove('is-visible');
        document.body.classList.remove('is-fx-results');
    }

    function showFxDetailsView() {
        resultsViewMode = 'details';
        if (trackingResults) {
            trackingResults.setAttribute('data-view', 'details');
        }
        if (viewStatus) {
            viewStatus.hidden = true;
        }
        if (viewDetails) {
            viewDetails.hidden = false;
        }
        window.scrollTo(0, 0);
    }

    function showFxStatusView() {
        resultsViewMode = 'status';
        if (trackingResults) {
            trackingResults.setAttribute('data-view', 'status');
        }
        if (viewDetails) {
            viewDetails.hidden = true;
        }
        if (viewStatus) {
            viewStatus.hidden = false;
        }
        window.scrollTo(0, 0);
    }

    const LOADER_IMAGE_SRCS = [
        'loading-label.webp',
        'loading-label.jpg',
        'loading-plane.webp',
        'loading-plane.jpg',
        'loading-logo.webp',
        'loading-logo.jpg'
    ];
    let loaderImagesPrimed = false;

    function primeLoaderImages() {
        if (loaderImagesPrimed) {
            return;
        }
        loaderImagesPrimed = true;
        LOADER_IMAGE_SRCS.forEach(function (src) {
            const im = new Image();
            im.src = src;
        });
        if (trackingLoader) {
            trackingLoader.querySelectorAll('picture').forEach(function (picture) {
                picture.querySelectorAll('[data-src], [data-srcset]').forEach(function (el) {
                    const srcset = el.getAttribute('data-srcset');
                    if (srcset && !el.getAttribute('srcset')) {
                        el.setAttribute('srcset', srcset);
                    }
                    const src = el.getAttribute('data-src');
                    if (src && !el.getAttribute('src')) {
                        el.setAttribute('src', src);
                    }
                });
            });
        }
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(function () {
            primeLoaderImages();
        }, { timeout: 3000 });
    } else {
        setTimeout(primeLoaderImages, 2500);
    }

    if (trackButton) {
        trackButton.addEventListener('pointerenter', primeLoaderImages, { once: true, passive: true });
        trackButton.addEventListener('focus', primeLoaderImages, { once: true });
    }

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

    let trackingDatabase = {};
    let trackingDataLastFetch = 0;

    function refreshTrackingDatabase() {
        return new Promise(function (resolve) {
            const src = 'tracking-data.js?_=' + Date.now();
            const existing = document.getElementById('fedexTrackingDataScript');
            if (existing) {
                existing.remove();
            }
            delete window.__FEDEX_TRACKING_DATA__;

            const s = document.createElement('script');
            s.id = 'fedexTrackingDataScript';
            s.src = src;
            s.onload = function () {
                trackingDatabase = window.__FEDEX_TRACKING_DATA__ || {};
                trackingDataLastFetch = Date.now();
                resolve(Object.keys(trackingDatabase).length > 0);
            };
            s.onerror = function () {
                resolve(false);
            };
            document.head.appendChild(s);
        });
    }

    function maybeRefreshTrackingDataForLiveView() {
        if (Date.now() - trackingDataLastFetch < 45000) {
            return Promise.resolve(false);
        }
        return refreshTrackingDatabase().then(function (ok) {
            if (ok && lastShownTrackingNumber && trackingDatabase[lastShownTrackingNumber]) {
                displayTrackingResults(
                    lastShownTrackingNumber,
                    trackingDatabase[lastShownTrackingNumber],
                    resultsViewMode
                );
            }
            return ok;
        });
    }

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
        const city = String(parsed.city || '')
            .toLowerCase()
            .replace(/\b[a-z]/g, function (c) {
                return c.toUpperCase();
            });
        return city + ', ' + parsed.state;
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
        'SAN DIEGO,CA': 'America/Los_Angeles',
        'INDIO,CA': 'America/Los_Angeles',
        'BLYTHE,CA': 'America/Los_Angeles',
        'SEATTLE,WA': 'America/Los_Angeles',
        'DALLAS,TX': 'America/Chicago',
        'CHICAGO,IL': 'America/Chicago',
        'NEW YORK,NY': 'America/New_York',
        'CUPERTINO,CA': 'America/Los_Angeles',
        'SAN JOSE,CA': 'America/Los_Angeles',
        'LOS ANGELES,CA': 'America/Los_Angeles',
        'BEVERLY HILLS,CA': 'America/Los_Angeles',
        'BRONX,NY': 'America/New_York',
        'MEMPHIS,TN': 'America/Chicago',
        'AMITE,LA': 'America/Chicago',
        'NEW ORLEANS,LA': 'America/Chicago',
        'COLUMBUS,OH': 'America/New_York',
        'PITTSBURGH,PA': 'America/New_York',
        'TEMPLETON,PA': 'America/New_York',
        'FAIRFIELD,CT': 'America/New_York',
        'HARTFORD,CT': 'America/New_York',
        'SPRINGFIELD,MA': 'America/New_York',
        'SAFETY HARBOR,FL': 'America/New_York',
        'CLEARWATER,FL': 'America/New_York',
        'TAMPA,FL': 'America/New_York',
        'ORLANDO,FL': 'America/New_York',
        'JACKSONVILLE,FL': 'America/New_York',
        'LUTZ,FL': 'America/New_York'
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
        const u = String(locationString || '').toUpperCase();
        if (
            u.indexOf('CAPE TOWN') >= 0 ||
            u.indexOf('JOHANNESBURG') >= 0 ||
            u.indexOf('SOUTH AFRICA') >= 0 ||
            u.indexOf('IHLATHI') >= 0 ||
            u.indexOf('MANNINGFORD') >= 0
        ) {
            return 'Africa/Johannesburg';
        }
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
        maybeRefreshTrackingDataForLiveView();

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

        if (lastShownTrackingNumber && isResultsVisible()) {
            const base = trackingDatabase[lastShownTrackingNumber];
            if (base) {
                const progressed = applyScanTimelineProgress(
                    applyOutForDeliveryTodayScan(resolveTrackingDataForDisplay(base))
                );
                if (progressed.stageIdx !== lastScanStageIdx) {
                    displayTrackingResults(lastShownTrackingNumber, base, resultsViewMode);
                }
            }
        }
    }

    function startDetailsLiveClock() {
        clearDetailsLiveClock();
        tickDetailsLiveClock();
        detailsLiveIntervalId = setInterval(tickDetailsLiveClock, 30000);
    }

    function parseFirstTrackingNumber(raw) {
        const lines = String(raw)
            .split(/\r?\n/)
            .map(function (s) {
                return sanitizeTrackingToken(s.trim());
            })
            .filter(Boolean);
        if (lines.length) {
            return sanitizeTrackingToken(lines[0].split(',')[0].trim());
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
            'Label Created': 'FROM',
            'In Transit': 'IN TRANSIT',
            'Out For Delivery': 'OUT FOR DELIVERY',
            'Delivery Exception': 'DELIVERY EXCEPTION'
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

    /** FedEx-style: only reveal scan events that have already happened; always keep TO. */
    function stepsVisibleLikeFedex(steps, currentIdx) {
        const visible = [];
        let newCurrentIdx = 0;
        steps.forEach(function (step, i) {
            if (i <= currentIdx || step.title === 'TO') {
                if (i === currentIdx) {
                    newCurrentIdx = visible.length;
                }
                visible.push(step);
            }
        });
        if (visible.length && visible[visible.length - 1].title !== 'TO') {
            const toStep = steps.find(function (s) {
                return s.title === 'TO';
            });
            if (toStep) {
                visible.push(toStep);
            }
        }
        if (currentIdx >= steps.length - 1 && steps[currentIdx] && steps[currentIdx].title === 'TO') {
            newCurrentIdx = visible.length - 1;
        }
        return { steps: visible, currentIdx: newCurrentIdx };
    }

    function renderTimeline(steps, currentIdx) {
        const n = steps.length || 1;
        /* Progress rail to the center of the current step; gray continues to TO */
        const splitPct = Math.min(96, Math.max(10, ((currentIdx + 0.55) / n) * 100));
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
            if (step.title === 'FROM') {
                dateLine = escapeHtml(t('labelCreatedPrefix')) + escapeHtml(step.date);
            } else if (isCurrent && step.title === 'OUT FOR DELIVERY' && step.timeZone) {
                dateLine =
                    '<span class="tdetails-live-time" data-iana="' +
                    escapeHtml(step.timeZone) +
                    '" data-format="datetime">' +
                    escapeHtml(formatDateTimeInZone(new Date(), step.timeZone)) +
                    '</span>';
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

    function getDeliveryNotice(data) {
        if (!data.deliveryNotice) {
            return '';
        }
        if (typeof data.deliveryNotice === 'string') {
            return data.deliveryNotice;
        }
        return data.deliveryNotice[currentLang] || data.deliveryNotice.en || '';
    }

    function getHoldMessage(data) {
        if (!data.holdMessage) {
            return getDeliveryNotice(data);
        }
        if (typeof data.holdMessage === 'string') {
            return data.holdMessage;
        }
        return data.holdMessage[currentLang] || data.holdMessage.en || '';
    }

    function formatShipDateDisplay(dateStr) {
        const m = String(dateStr || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (!m) {
            return dateStr || '';
        }
        return Number(m[1]) + '/' + String(m[2]).padStart(2, '0') + '/' + m[3];
    }

    function formatRouteEndpoint(loc) {
        const cleaned = String(loc || '')
            .replace(/^FROM\s+/i, '')
            .trim();
        const parsed = parseUsCityStateFromLocation(cleaned);
        if (parsed) {
            return (parsed.city + ', ' + parsed.state + ' US').toUpperCase();
        }
        const near = formatStatusNearFromLocation(cleaned);
        if (near) {
            if (/South Africa/i.test(near)) {
                return (near.replace(/,\s*South Africa$/i, '') + ' ZA').toUpperCase();
            }
            return (near + (/,\s*[A-Z]{2}$/.test(near) ? ' US' : '')).toUpperCase();
        }
        return cleaned.toUpperCase();
    }

    function splitScanDateTime(dateStr) {
        const raw = String(dateStr || '').trim();
        const m = raw.match(/^(\d{1,2}\/\d{1,2}\/\d{4})(?:\s+(.+))?$/);
        if (!m) {
            return { date: raw, time: '' };
        }
        return { date: m[1], time: (m[2] || '').trim() };
    }

    function weekdayForUsDate(dateStr) {
        const m = String(dateStr || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (!m) {
            return '';
        }
        const d = new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
        if (isNaN(d.getTime())) {
            return '';
        }
        return new Intl.DateTimeFormat(getIntlLocale(), { weekday: 'long' }).format(d);
    }

    function friendlyEventStatus(title, index, total) {
        if (title === 'LABEL CREATED') {
            return 'Shipment information sent to FedEx';
        }
        if (title === 'PACKAGE RECEIVED BY FEDEX') {
            return 'Picked up';
        }
        if (title === 'OUT FOR DELIVERY') {
            return 'On FedEx vehicle for delivery';
        }
        if (title === 'DELIVERY EXCEPTION') {
            return 'Shipment on hold';
        }
        if (title === 'DELIVERED') {
            return 'Delivered';
        }
        if (title === 'IN TRANSIT') {
            if (index <= 1) {
                return 'Left FedEx origin facility';
            }
            if (index === total - 1) {
                return 'At local FedEx facility';
            }
            if (index === 2) {
                return 'Arrived at FedEx hub';
            }
            return 'On the way';
        }
        return title;
    }

    function translateEventStatus(status) {
        if (currentLang !== 'es') {
            return status;
        }
        return EVENT_STATUS_ES[status] || status;
    }

    function shortEventLocation(loc) {
        const near = formatStatusNearFromLocation(loc);
        if (near) {
            return near;
        }
        return String(loc || '')
            .replace(/^FROM\s+/i, '')
            .split(',')[0]
            .trim();
    }

    function cardStatusHeading(deliveryStatus, onHold) {
        if (onHold) {
            return t('statusDeliveryUpdated');
        }
        if (deliveryStatus === 'Out For Delivery') {
            return t('statusOutForDelivery');
        }
        if (deliveryStatus === 'Delivered') {
            return t('statusDelivered');
        }
        if (deliveryStatus === 'Label Created') {
            return t('statusLabelCreated');
        }
        if (deliveryStatus === 'Delivery Exception') {
            return t('statusException');
        }
        return t('statusOnTheWay');
    }

    function heroMessageFor(data, deliveryStatus, onHold) {
        if (onHold) {
            return getHoldMessage(data) || t('heroHoldDefault');
        }
        if (deliveryStatus === 'Out For Delivery') {
            return t('heroOutForDelivery');
        }
        if (deliveryStatus === 'Delivered') {
            return t('heroDelivered');
        }
        if (deliveryStatus === 'Label Created') {
            return t('heroLabelCreated');
        }
        return t('heroInTransit');
    }

    function progressPercent(stageIdx, totalScans, deliveryStatus) {
        if (deliveryStatus === 'Delivered') {
            return 100;
        }
        const denom = Math.max(1, totalScans - 1);
        const pct = Math.round((stageIdx / denom) * 100);
        return Math.max(8, Math.min(92, pct));
    }

    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value == null ? '' : String(value);
        }
    }

    function renderFxFooter(targetId, withStatusClass) {
        const el = document.getElementById(targetId);
        if (!el) {
            return;
        }
        const footerClass = withStatusClass ? 'fx-footer fx-footer--status' : 'fx-footer';
        el.innerHTML =
            '<footer class="' +
            footerClass +
            '">' +
            '<h3 class="fx-footer-h">' +
            escapeHtml(t('footerOurCompany')) +
            '</h3>' +
            '<a href="#">' +
            escapeHtml(t('footerAbout')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerPortfolio')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerInvestor')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerCareers')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerContracting')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerBlog')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerResponsibility')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerNewsroom')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerContact')) +
            '</a>' +
            '<h3 class="fx-footer-h">' +
            escapeHtml(t('footerMoreFrom')) +
            '</h3>' +
            '<a href="#">' +
            escapeHtml(t('footerCompatible')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerDeveloper')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerLogistics')) +
            '</a>' +
            '<h3 class="fx-footer-h">' +
            escapeHtml(t('footerPolicy')) +
            '</h3>' +
            '<a href="#">' +
            escapeHtml(t('footerTerms')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerPrivacySecurity')) +
            '</a>' +
            '<a href="#" class="fx-footer-link-underline">' +
            escapeHtml(t('footerAdChoices')) +
            '</a>' +
            '<a href="#">' +
            escapeHtml(t('footerPrivacyChoices')) +
            '</a>' +
            '<div class="fx-region">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="9"/>' +
            '<path d="M3 12h18M12 3c2.8 2.8 4.2 6 4.2 9s-1.4 6.2-4.2 9c-2.8-2.8-4.2-6-4.2-9s1.4-6.2 4.2-9z"/>' +
            '</svg>' +
            escapeHtml(t('localeUS')) +
            '</div>' +
            '<h3 class="fx-footer-h">' +
            escapeHtml(t('footerFollow')) +
            '</h3>' +
            '<div class="fx-social" aria-label="Social links">' +
            '<a href="#" aria-label="Email"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg></a>' +
            '<a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z"/></svg></a>' +
            '<a href="#" aria-label="X"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 3H21l-6.6 7.5L22 21h-6.2l-4.9-6.4L5.4 21H2.6l7-8L2 3h6.3l4.4 5.8L18.2 3zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5z"/></svg></a>' +
            '<a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>' +
            '<a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 9H3.7v11h2.8V9zM5.1 3.5A1.7 1.7 0 1 0 5.1 7a1.7 1.7 0 0 0 0-3.5zM20.3 20h-2.8v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H10.8V9h2.7v1.5h.1c.4-.7 1.3-1.8 3.1-1.8 3.3 0 3.9 2.2 3.9 5V20z"/></svg></a>' +
            '<a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12.2s0-3.4-.4-5c-.2-.9-.9-1.6-1.8-1.8C18.7 5 12 5 12 5s-6.7 0-8.8.4C2.3 5.6 1.6 6.3 1.4 7.2 1 8.8 1 12.2 1 12.2s0 3.4.4 5c.2.9.9 1.6 1.8 1.8C5.3 19.4 12 19.4 12 19.4s6.7 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5 .4-5zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z"/></svg></a>' +
            '<a href="#" aria-label="Pinterest"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.7 2 .2.1.2.2.1.5l-.3 1c-.1.2-.2.3-.4.2-1.5-.6-2.2-2.3-2.2-4.2 0-3.1 2.6-6.9 7.8-6.9 4.2 0 6.9 3 6.9 6.3 0 4.3-2.4 7.5-5.9 7.5-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-1 2.2-1.5 3C10.1 21.9 11 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg></a>' +
            '</div>' +
            '</footer>' +
            '<div class="fx-legal">' +
            '<div>' +
            escapeHtml(t('copyrightLine')) +
            '</div>' +
            '<div class="fx-legal-links">' +
            '<a href="#">' +
            escapeHtml(t('footerSitemap')) +
            '</a> | ' +
            '<a href="#">' +
            escapeHtml(t('footerCookieConsent')) +
            '</a> | ' +
            '<a href="#">' +
            escapeHtml(t('footerCookieConsent')) +
            '</a>' +
            '</div>' +
            '</div>';
    }

    function renderTravelHistory(timeline, currentStageIdx) {
        const host = document.getElementById('fxTravelHistory');
        if (!host) {
            return;
        }
        const events = (timeline || []).slice();
        /* Only show scans that have occurred (same FedEx-style reveal) */
        const visibleEvents = [];
        events.forEach(function (ev, i) {
            if (i <= currentStageIdx) {
                visibleEvents.push({ ev: ev, idx: i });
            }
        });
        if (!visibleEvents.length && events.length) {
            visibleEvents.push({ ev: events[0], idx: 0 });
        }

        const groups = [];
        const byDate = {};
        visibleEvents
            .slice()
            .reverse()
            .forEach(function (item) {
                const parts = splitScanDateTime(item.ev.date);
                if (!byDate[parts.date]) {
                    byDate[parts.date] = [];
                    groups.push(parts.date);
                }
                byDate[parts.date].push({
                    time: parts.time,
                    status: translateEventStatus(
                        friendlyEventStatus(item.ev.title, item.idx, events.length)
                    ),
                    loc: shortEventLocation(item.ev.location),
                    isLatest: item.idx === currentStageIdx
                });
            });

        let html = '<div class="fx-timeline">';
        groups.forEach(function (dateKey) {
            const weekday = weekdayForUsDate(dateKey);
            const title = weekday ? weekday + ', ' + dateKey : dateKey;
            html += '<div class="fx-day"><h3 class="fx-day-title">' + escapeHtml(title) + '</h3><ul class="fx-events">';
            byDate[dateKey].forEach(function (row) {
                const marker = row.isLatest
                    ? '<span class="fx-arrow-marker" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>'
                    : '<span class="fx-dot" aria-hidden="true"></span>';
                html +=
                    '<li class="fx-event">' +
                    '<div class="fx-event-marker">' +
                    marker +
                    '</div>' +
                    '<div class="fx-event-body">' +
                    (row.time ? '<div class="fx-event-time">' + escapeHtml(row.time) + '</div>' : '') +
                    '<div class="fx-event-status">' +
                    escapeHtml(row.status) +
                    '</div>' +
                    (row.loc ? '<div class="fx-event-loc">' + escapeHtml(row.loc) + '</div>' : '') +
                    '</div></li>';
            });
            html += '</ul></div>';
        });
        html += '</div>';
        host.innerHTML = html;
    }

    function factRow(label, value, withHelp) {
        return (
            '<tr><th>' +
            escapeHtml(label) +
            (withHelp ? ' <span class="fx-q" title="More info">?</span>' : '') +
            '</th><td>' +
            escapeHtml(value) +
            '</td></tr>'
        );
    }

    function displayTrackingResults(trackingNumber, data, preferredView) {
        lastShownTrackingNumber = trackingNumber;

        if (trackingSection) {
            trackingSection.style.display = 'none';
        }
        if (homeBelowTrack) {
            homeBelowTrack.style.display = 'none';
        }
        if (globalHeader) {
            globalHeader.style.display = 'none';
        }
        mainMain.classList.remove('m-main--web-home');
        mainMain.classList.add('m-main--details');
        mobileShell.classList.add('mobile-shell--details');

        showResultsPanel();
        window.scrollTo(0, 0);
        syncBackToTop();

        const progressed = applyScanTimelineProgress(
            applyOutForDeliveryTodayScan(resolveTrackingDataForDisplay(data))
        );
        data = progressed.data;
        lastScanStageIdx = progressed.stageIdx;

        const onHold =
            (progressed.stage && progressed.stage.stepTitle === 'DELIVERY EXCEPTION') ||
            data.deliveryStatus === 'Delivery Exception';

        const totalScans = 1 + (data.timeline || []).filter(function (ev) {
            return ev.title !== 'LABEL CREATED';
        }).length;
        const pct = progressPercent(progressed.stageIdx, totalScans, data.deliveryStatus);
        const fromRoute = formatRouteEndpoint(data.fromLocation);
        const toRoute = formatRouteEndpoint(data.toLocation);

        let statusNear = data.statusNearPlace;
        if (!statusNear && progressed.stage) {
            const allSteps = buildSteps(data);
            const stageIdx = findStepIndexForRouteStage(allSteps, progressed.stage);
            if (stageIdx >= 0 && allSteps[stageIdx]) {
                statusNear = formatStatusNearFromLocation(allSteps[stageIdx].location);
            }
        }
        if (!statusNear) {
            statusNear = formatStatusNearFromLocation(data.toLocation);
        }

        setText('fxTrackId', '#' + trackingNumber);
        setText('fxHeroMsg', heroMessageFor(data, data.deliveryStatus, onHold));
        setText(
            'fxHeroLocText',
            statusNear ? t('currentlyIn') + ' ' + statusNear : ''
        );
        const heroLoc = document.getElementById('fxHeroLoc');
        if (heroLoc) {
            heroLoc.style.display = statusNear ? '' : 'none';
        }

        setText('fxRouteFrom', fromRoute);
        setText('fxRouteTo', toRoute);
        setText('fxCardStatus', cardStatusHeading(data.deliveryStatus, onHold));
        setText('fxFromPlace', fromRoute);
        setText('fxToPlace', toRoute);
        setText('fxSubnavId', t('trackingId') + ': ' + trackingNumber);

        const progressEl = document.getElementById('fxProgress');
        if (progressEl) {
            progressEl.style.setProperty('--progress', pct + '%');
            progressEl.setAttribute('aria-label', 'Shipment progress about ' + pct + ' percent');
        }

        /* Travel history uses timeline indices; LABEL CREATED is index 0 in timeline */
        let historyStageIdx = 0;
        const timeline = data.timeline || [];
        if (progressed.stage) {
            for (let i = 0; i < timeline.length; i++) {
                if (timeline[i].title !== progressed.stage.stepTitle) {
                    continue;
                }
                if (
                    progressed.stage.locationIncludes &&
                    String(timeline[i].location || '')
                        .toUpperCase()
                        .indexOf(String(progressed.stage.locationIncludes).toUpperCase()) === -1
                ) {
                    continue;
                }
                historyStageIdx = i;
            }
            if (progressed.stage.stepTitle === 'FROM') {
                historyStageIdx = 0;
            }
        }
        renderTravelHistory(timeline, historyStageIdx);

        const estimatedLine = data.estimatedDelivery || '';
        const deliveryDetails = onHold
            ? t('willUpdateSoon')
            : estimatedLine || data.deliveryTime || t('willUpdateSoon');

        const overview = document.getElementById('fxFactsOverview');
        if (overview) {
            overview.innerHTML =
                factRow(t('trackingNumberLabel'), trackingNumber) +
                factRow(t('shipDateLabel'), formatShipDateDisplay(data.labelCreatedDate || ''), true) +
                factRow(t('deliveryDetailsLabel'), deliveryDetails, true);
        }
        const services = document.getElementById('fxFactsServices');
        if (services) {
            services.innerHTML =
                factRow('Service', data.serviceType || 'FedEx Ground') +
                factRow(t('termsLabel'), t('termsShipper')) +
                factRow(t('specialHandlingLabel'), t('specialHandlingDefault'));
        }
        const pkg = document.getElementById('fxFactsPackage');
        if (pkg) {
            const weight = data.weight || t('weightDefault');
            pkg.innerHTML =
                factRow(t('weightLabel'), weight) +
                factRow(t('totalPiecesLabel'), data.totalPieces || t('totalPiecesDefault')) +
                factRow(t('totalShipmentWeightLabel'), data.totalShipmentWeight || weight) +
                factRow(t('packagingLabel'), data.packaging || t('packagingDefault'));
        }

        renderFxFooter('fxFooterStatus', true);
        renderFxFooter('fxFooterDetails', false);

        if (preferredView === 'details') {
            showFxDetailsView();
        } else {
            showFxStatusView();
        }

        startDetailsLiveClock();
        if (trackingResults) {
            trackingResults.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }

    function syncTrackButtonState() {
        if (!trackButton) {
            return;
        }
        const hasValue = !!(trackingInput && trackingInput.value.trim());
        trackButton.classList.toggle('is-ready', hasValue);
    }

    if (trackingInput) {
        trackingInput.addEventListener('input', syncTrackButtonState);
        trackingInput.addEventListener('change', syncTrackButtonState);
    }

    if (trackButton) {
        trackButton.addEventListener('click', handleTracking);
    }

    syncTrackButtonState();

    if (newSearchBtn) {
        newSearchBtn.addEventListener('click', function () {
            resetTracking();
        });
    }

    function goHomeFromResults(e) {
        if (e) {
            e.preventDefault();
        }
        if (isResultsVisible()) {
            resetTracking();
        }
    }

    if (logoHome) {
        logoHome.addEventListener('click', goHomeFromResults);
    }
    if (fxLogoHome) {
        fxLogoHome.addEventListener('click', goHomeFromResults);
    }

    document.querySelectorAll('[data-open-details]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            showFxDetailsView();
        });
    });

    document.querySelectorAll('.fx-btn-primary, .fx-signin, .fx-menu').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });

    const backToStatusBtn = document.getElementById('backToStatus');
    if (backToStatusBtn) {
        backToStatusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showFxStatusView();
        });
    }

    const factsToggle = document.getElementById('facts-title');
    const factsBody = document.getElementById('factsBody');
    if (factsToggle && factsBody) {
        factsToggle.addEventListener('click', function () {
            const open = factsToggle.getAttribute('aria-expanded') === 'true';
            factsToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
            factsBody.hidden = open;
        });
    }

    function getDisplayedTrackingNumber() {
        if (lastShownTrackingNumber) {
            return String(lastShownTrackingNumber).trim();
        }
        const trackEl = document.getElementById('fxTrackId');
        if (trackEl) {
            const fromHero = String(trackEl.textContent || '')
                .replace(/^#/, '')
                .trim();
            if (fromHero) {
                return fromHero;
            }
        }
        const subnav = document.getElementById('fxSubnavId');
        if (subnav) {
            const m = String(subnav.textContent || '').match(/(\d{8,})/);
            if (m) {
                return m[1];
            }
        }
        return '';
    }

    function writeClipboardText(value) {
        if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
            return navigator.clipboard.writeText(value);
        }
        return new Promise(function (resolve, reject) {
            const ta = document.createElement('textarea');
            ta.value = value;
            ta.setAttribute('readonly', '');
            ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            ta.setSelectionRange(0, value.length);
            let ok = false;
            try {
                ok = document.execCommand('copy');
            } catch (err) {
                ok = false;
            }
            document.body.removeChild(ta);
            if (ok) {
                resolve();
            } else {
                reject(new Error('copy failed'));
            }
        });
    }

    function copyTrackingNumber(e) {
        if (e) {
            e.preventDefault();
        }
        const value = getDisplayedTrackingNumber();
        if (!value) {
            return;
        }
        writeClipboardText(value).then(
            function () {
                showNotification(t('copiedToast'), 'success');
            },
            function () {
                showNotification(t('copiedToast'), 'success');
            }
        );
    }

    const fxCopyTrack = document.getElementById('fxCopyTrack');
    const fxCopyTrackDetails = document.getElementById('fxCopyTrackDetails');
    if (fxCopyTrack) {
        fxCopyTrack.addEventListener('click', copyTrackingNumber);
    }
    if (fxCopyTrackDetails) {
        fxCopyTrackDetails.addEventListener('click', copyTrackingNumber);
    }

    const fxSubnavId = document.getElementById('fxSubnavId');
    if (fxSubnavId) {
        fxSubnavId.addEventListener('click', copyTrackingNumber);
    }

    function runTrackingLoadSequence(onDone) {
        primeLoaderImages();

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

        const originalLabel = trackButton ? trackButton.textContent : '';
        if (trackButton) {
            trackButton.textContent = '…';
            trackButton.disabled = true;
        }

        refreshTrackingDatabase().then(function () {
            const trackingData = trackingDatabase[trackingNumber];
            if (!trackingData) {
                if (trackButton) {
                    trackButton.textContent = originalLabel;
                    trackButton.disabled = false;
                }
                showNotification(t('notifWrong'), 'error');
                return;
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
                displayTrackingResults(trackingNumber, trackingData, 'status');
            });
        });
    }

    function resetTracking() {
        lastShownTrackingNumber = null;
        lastScanStageIdx = null;
        resultsViewMode = 'status';
        clearDetailsLiveClock();
        hideResultsPanel();
        showFxStatusView();
        if (globalHeader) {
            globalHeader.style.display = '';
        }
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
        syncTrackButtonState();
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
        '.m-btn-track, .m-icon-btn, .tdetails-new-search, .m-btn-pill-outline, .m-footer-social, #langSelect, .fx-btn, .fx-details-link, .fx-fab, .fx-menu, .fx-icon-btn';
    document.querySelectorAll(touchSelectors).forEach(function (el) {
        el.addEventListener('touchstart', function () {
            this.style.opacity = '0.75';
        });
        el.addEventListener('touchend', function () {
            this.style.opacity = '1';
        });
    });

    initInspectDeterrent();
    refreshTrackingDatabase();
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState !== 'visible') {
            return;
        }
        refreshTrackingDatabase().then(function (ok) {
            if (ok && lastShownTrackingNumber && trackingDatabase[lastShownTrackingNumber]) {
                displayTrackingResults(lastShownTrackingNumber, trackingDatabase[lastShownTrackingNumber], resultsViewMode);
            }
        });
    });
});

function initInspectDeterrent() {
    document.addEventListener(
        'contextmenu',
        function (e) {
            e.preventDefault();
        },
        { capture: true }
    );

    document.addEventListener(
        'keydown',
        function (e) {
            const key = e.key || '';
            const mod = e.ctrlKey || e.metaKey;

            if (key === 'F12') {
                e.preventDefault();
                return;
            }

            if (mod && e.shiftKey && /^[ijck]$/i.test(key)) {
                e.preventDefault();
                return;
            }

            if (mod && /^u$/i.test(key)) {
                e.preventDefault();
            }
        },
        { capture: true }
    );
}
