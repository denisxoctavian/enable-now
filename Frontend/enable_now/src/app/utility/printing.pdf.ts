import jsPDF from "jspdf";
import 'jspdf-autotable';

export function printPdf(fullName: any) {
  const doc = new jsPDF({ orientation: 'landscape' });
  const logoImg = new Image();
  logoImg.src = 'assets/imgs/diploma_template.jpg';

  const imgWidth = doc.internal.pageSize.getWidth();
  const imgHeight = doc.internal.pageSize.getHeight();
  doc.addImage(logoImg, 'PNG', 0, 0, imgWidth, imgHeight);

  doc.setFontSize(20);
  doc.setTextColor("white");
  doc.text(`${fullName}`, 115, 80);

  doc.save(`diploma_${fullName}.pdf`);
}
