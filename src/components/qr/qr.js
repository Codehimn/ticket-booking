import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { toast } from 'react-toastify';

const QRScanner = () => {
    const [qrCode, setQRCode] = useState('');
    const [canScan, setCanScan] = useState(true);
    const scannerRef = useRef(null);
    const html5QrcodeScannerRef = useRef(null);  // Nueva referencia para el escáner

    const handleScan = (decodedText, decodedResult) => {
        setQRCode(decodedText);
        html5QrcodeScannerRef.current.pause(true);  // Pausar el escáner

        toast.success(`Código QR decodedText: ${decodedText}`);

        // Esperar 10 segundos antes de permitir otra lectura
        setTimeout(() => {
            html5QrcodeScannerRef.current.resume();
        }, 1000);
    };

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                fps: 10,
                qrbox: { width: 200, height: 200 }, // Tamaño ajustado
                supportedScanTypes: [Html5QrcodeSupportedFormats.QR_CODE]
            },
            false
        );

        html5QrcodeScannerRef.current = scanner;  // Guardar la instancia del escáner
        scanner.render(handleScan);

        return () => {
            if (scanner) {
                scanner.clear().catch((error) => {
                    console.error('Error cleaning up scanner:', error);
                });
            }
        };
    }, []);

    return <div id="reader" ref={scannerRef} style={{ width: '40em', height: '40em' }}></div>;
};

export default QRScanner;
