<?php

$label = null;
$color = null;

if(!empty($_GET)) {
    $color = "#{$_GET['color']}";


}

if ($color == "#ff0000") {
    $label = 'Red';
}elseif($color == "#00ff00") {
    $label = 'green';
}elseif($color == "#0000ff") {
    $label = 'blue';
}else{
    $label="unknown";

}


?>
<div style="color<?php echo $color; ?>">
    The color is <?php echo $label; ?>
</div>

<a href="?color=00ff00">Green</a> |
<a href="?color=00ff00">Red</a> |
<a href="?color=00ff00">Blue</a> |
