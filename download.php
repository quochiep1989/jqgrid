<?php 


error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

if (PHP_SAPI == 'cli')
    die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once dirname(__FILE__) . '/../Classes/PHPExcel.php';
require_once dirname(__FILE__) . '/../Classes/PHPExcel/IOFactory.php';

$objPHPExcel = PHPExcel_IOFactory::load("../Classes/PHPExcel/test.xlsx");
$sharedStyle1 = new PHPExcel_Style();
$sharedStyle2 = new PHPExcel_Style();
$sharedStyle3 = new PHPExcel_Style();
$sharedStyle1->applyFromArray(
        array(
            'borders' => array(
                'bottom' => array('style' => PHPExcel_Style_Border::BORDER_HAIR),
                'right' => array('style' => PHPExcel_Style_Border::BORDER_HAIR),
                'left' => array('style' => PHPExcel_Style_Border::BORDER_HAIR),
                'top' => array('style' => PHPExcel_Style_Border::BORDER_HAIR),
            )
));
$sharedStyle2->applyFromArray(
        array(
            'borders' => array(
                'bottom' => array('style' => PHPExcel_Style_Border::BORDER_HAIR),
                'right' => array('style' => PHPExcel_Style_Border::BORDER_HAIR),
                'left' => array('style' => PHPExcel_Style_Border::BORDER_HAIR),
                'top' => array('style' => PHPExcel_Style_Border::BORDER_MEDIUM),
            )
));
$sharedStyle3->applyFromArray(
        array('fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('argb' => 'FFFFFF00')
    )));
$objPHPExcel->setActiveSheetIndex(0);

$data = array(0 => array("id" => 2, "name" => "heieof"),
    1 => array("id" => 5, "name" => "dadhjsad"),
    2 => array("id" => 5, "name" => "dadhjsad"),
    3 => array("id" => 5, "name" => "dadhjsad"),
    4 => array("id" => 6, "name" => "dadhjsad"),
    5 => array("id" => 6, "name" => "dadhjsad"),
    6 => array("id" => 6, "name" => "dadhjsad"),
    7 => array("id" => 7, "name" => "dadhjsad"),
);
$col = 0;
$temp_id = $data[0]['id'];
$tmp = 1;
foreach ($data as $row => $line) {
    $objPHPExcel->getActiveSheet()->insertNewRowBefore($row+7,1);
    $objPHPExcel->getActiveSheet()->setCellValue("B" . ($row + 7), $line['id']);
    $objPHPExcel->getActiveSheet()->setCellValue("C" . ($row + 7), $line['name']);
    $objPHPExcel->getActiveSheet()->setSharedStyle($sharedStyle3, "A" . ($row + 7) . ":" . "A" . ($row + 7));
    if ($line['id'] == $temp_id) {
        $objPHPExcel->getActiveSheet()->setCellValue("A" . ($row + 7), $tmp);
        $objPHPExcel->getActiveSheet()->setSharedStyle($sharedStyle1, "A" . ($row + 7) . ":" . "A" . ($row + 7));
        $objPHPExcel->getActiveSheet()->setSharedStyle($sharedStyle1, "B" . ($row + 7) . ":" . "B" . ($row + 7));
        $objPHPExcel->getActiveSheet()->setSharedStyle($sharedStyle1, "C" . ($row + 7) . ":" . "C" . ($row + 7));
    } else {
        $temp_id = $line['id'];
        $tmp++;
        $objPHPExcel->getActiveSheet()->setCellValue("A" . ($row + 7), $tmp);
        $objPHPExcel->getActiveSheet()->setSharedStyle($sharedStyle2, "A" . ($row + 7) . ":" . "A" . ($row + 7));
        $objPHPExcel->getActiveSheet()->setSharedStyle($sharedStyle2, "B" . ($row + 7) . ":" . "B" . ($row + 7));
        $objPHPExcel->getActiveSheet()->setSharedStyle($sharedStyle2, "C" . ($row + 7) . ":" . "C" . ($row + 7));
    }
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="01simple.xlsx"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php:output');
exit;
