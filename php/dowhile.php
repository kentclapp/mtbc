<?php

$items = [
    'for',
    'foreach',
    'while',
    'do-while'
];

$count = count($items);

echo "PHP Supports  {$count} types of loop";


$li='';
$i=0;
do {
    $li .= "<li>{$items[$i]}</li>";
    $i++;
} while ($i < $count);


echo "<ul>{$li}</ul>";
