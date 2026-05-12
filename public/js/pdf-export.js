(function () {

  window.exportPDF = function (elementId, filename) {
    const el = document.getElementById(elementId);
    if (!el) { console.warn('exportPDF: element not found', elementId); return; }

    const opt = {
      margin:        [10, 10],
      filename:      filename || 'document.pdf',
      image:         { type: 'jpeg', quality: 0.98 },
      html2canvas:   { scale: 2, useCORS: true, logging: false },
      jsPDF:         { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (typeof html2pdf === 'undefined') {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      s.onload = function () { html2pdf().set(opt).from(el).save(); };
      document.head.appendChild(s);
    } else {
      html2pdf().set(opt).from(el).save();
    }
  };

})();
