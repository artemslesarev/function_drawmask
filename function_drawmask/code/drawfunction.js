mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

outlets = 1;


var l  = 1000;
var w  = box.rect[2] - box.rect[0];
var h  = box.rect[3] - box.rect[1];
var last_x = 0;
var last_y = 0;
var domain = 1000;
var range = [0,0]

var check_stash = new Array(0, 0);


var point_stash = new Array();
for (i=0; i<l; i++) {
	point_stash[i] = new Array(0, 0);
}


function paint()
{


	with (mgraphics) {
		set_source_rgba(0.,0.,0.,1);
		set_line_width(0.5);
		rectangle(0,0,w,h);
		stroke();
		last_x = point_stash[l-1][0];
		last_y = point_stash[l-1][1];

        // set_source_rgba(0.,0.,0.,0);
        // set_line_width(2);

		for (i=l-2; i>=0; i--) {
			

				// arc(point_stash[i][0], point_stash[i][1], 2, 0, Math.PI*2);
				// // arc(last_x, last_y, 2, 0, Math.PI*2);
				// fill();
			
			
			last_x = point_stash[i][0];
			last_y = point_stash[i][1];
		}

	}
}
function clear()
{
    for(i=0;i<l;i++) {
        point_stash[i] = [0,0];
    }
    mgraphics.redraw();
}

function onclick(x,y)
{
	outlet(0,"clear");
    clear();
	bucketAdd(x, y);

}

function ondrag(x,y)
{
	bucketAdd(x, y);
    outlet(0, 
		scale(point_stash[i][0],0,w,0,domain),
		scale(point_stash[i][1],0,h,range[1],range[0]));
}


function onidle(x,y)
{

	check_stash[1] = x;
	check_stash[2] = y;
}


function onidleout(x,y)
{
	check_stash[0] = x;
	check_stash[1] = y;
}

function bucketAdd(x, y)
{
	
	for (i=0; i<(l-1); i++) {

		point_stash[i][0] = point_stash[i+1][0];
		point_stash[i][1] = point_stash[i+1][1];
	}
	

	point_stash[l - 1][0] = x;
	point_stash[l - 1][1] = y;
	
	check_stash[0] = x;
	check_stash[1] = y;

	mgraphics.redraw();
}

function _domain(x) 
{
	domain = x;
}

function _range(x,y)
{
	range = [x,y]
}

function scale(x, inLow, inHigh, outLow, outHigh) {

    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
}

