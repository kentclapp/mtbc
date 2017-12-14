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
while ($i < $count) {

    $li .= "<li>{$items[$i]}</li>";
    $i++;

}

echo "<ul>{$li}</ul>";
