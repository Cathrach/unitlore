var unitList = [];
var collapseID = 0;

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function buildList(unit) {
  $.each(unit, function(key, value) {
    var nameSTR = '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#unit'+collapseID+'">';
    if (value['ids']) {
      for (var num = 0; num < value['ids'].length; num++) {
        nameSTR += '<img src="' + imgPrePath + 'unit/img/unit_ills_thum_' + value['ids'][num] + '.png" width="40" height="40"/>';
      }
    }

    nameSTR += ' ' + value.name+'</a>: <span onclick=searchBatch("' + value.batch.replace(/\W/g, '_') + '") class="pseudolink">' + value.batch + ' </span><span style="float: right; vertical-align: middle;"><a href="'+value.wiki+'">Wiki</a> ' + '<a href="'+value.touchandswipe+'">touchandswipe</a></span></h4></div><div id="unit'+collapseID+'" class="panel-collapse collapse"><div class="panel-body"><div class="container-fluid">';

    var loreTOP = '<div class="row row-eq-height"><div class="col-xs-12 col-sm-12" style="background-color: #0099FF;"><h5 style = "text-align:left; color: white;"><b>Lore</b></h5></div></div>';

    if (value['lore']) {
      if (value['lore']['rare'].length > 0) {
        for (var item = 0; item < value['lore']['story'].length; item++) {
          loreTOP += '<div class="row row-eq-height"><div class="col-md-2" style="vertical-align:center;"><b>' + value['lore']['rare'][item] + '<i class="fa fa-star"></i> Lore: ' + value['lore']['names'][item] + '</b></div>';
          loreTOP += '<div class="col-md-2"><img src="' + imgPrePath + 'unit/img/unit_ills_full_' + value['ids'][item] + '.png" style="width: 95%; display: block; margin-left: auto; margin-right: auto;"></div>';
          loreTOP += '<div class="col-md-10">' + value['lore']['story'][item] + '</div></div>';
        }
      } else {
        loreTOP += '<div class="row"><div class="col-md-12">' + value['lore']['story'] + '</div>';
      }
    }

    if (value['related']) {
      var rel = '<h3><b>Related:</b></h3>';
      $.each(value['related'], function(rIndex, rVal) {
        rel += ' ' + rVal + ' |';
      });
    }
    var split = '<div class="row">&nbsp;</div>';
    var infoStr = nameSTR + loreTOP + split + rel + '</div></div></div></div>';
    unitList.push({"name": value.name, "collapsedInfo": infoStr, "home": value.home, "batch": value.batch, "names": value['lore']['names'], "element": value.element});
    collapseID += 1;
  });
}

$(document).on('click', '.location', function(e) {
  e.preventDefault();
  locSelect($(this).text());
})

$(document).on('click', '.element', function(e) {
  e.preventDefault();
  eleSelect($(this).text());
})

$(document).on('click', '#searchBatchBtn', function(e) {
  e.preventDefault();
  searchBatch($('#searchBatchBox').val());
})

$(document).on('click', '#searchNameBtn', function(e) {
  e.preventDefault();
  searchName($('#searchNameBox').val());
})
