var unitList = [];
var sphereList = [];
var collapseID = 0;
var sphereID = 0;

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
   return null;
 }
 else{
   return results[1] || 0;
 }
}

function buildList(unitData) {
  for (var unit in unitData) {
    var nameSTR = '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#unit'+collapseID+'">';
    for (var num in unitData[unit]['ids']) {
      nameSTR += '<img src="' + imgPrePath + 'unit/img/unit_ills_thum_' + unitData[unit]['ids'][num] + '.png" width="40" height="40"/>';
    }

    nameSTR += ' ' + unitData[unit]['name']+'</a>: <span onclick=searchBatch("' + unitData[unit]['batch'].replace(/\W/g, '_') + '") class="pseudolink">' + unitData[unit]['batch'] + ' </span><span style="float: right; vertical-align: middle;"><a href="'+unitData[unit]['wiki']+'">Wiki</a> ' + '<a href="'+unitData[unit]['touchandswipe']+'">touchandswipe</a></span></h4></div><div id="unit'+collapseID+'" class="panel-collapse collapse"><div class="panel-body"><div class="container-fluid">';

    var loreTOP = '<div class="row row-eq-height"><div class="col-xs-12 col-sm-12" style="background-color: #0099FF;"><h3 style = "text-align:left; color: white;"><b>Lore</b></h3></div></div>';

    for (var item in unitData[unit]['lore']['story']) {
      loreTOP += '<div class="row row-eq-height"><div class="col-md-2" style="vertical-align:center;"><b>' + unitData[unit]['lore']['rare'][item] + '<i class="fa fa-star"></i> Lore: ' + unitData[unit]['lore']['names'][item] + '</b></div>';
      loreTOP += '<div class="col-md-2"><a href="#imageModal" class="unit_img" data-toggle="modal" data-img-url="' + imgPrePath + 'unit/img/unit_ills_full_' + unitData[unit]['ids'][item] + '.png"><img src="' + imgPrePath + 'unit/img/unit_ills_full_' + unitData[unit]['ids'][item] + '.png" style="width: 95%; display: block; margin-left: auto; margin-right: auto;"></a></div>';
      loreTOP += '<div class="col-md-10">' + unitData[unit]['lore']['story'][item];
      if (unitData[unit]['lore']['LS'].length > 0) {
        loreTOP += '<br><b>LS: </b>' + unitData[unit]['lore']['LS'][item];
        loreTOP += '<br><b>BB: </b>' + unitData[unit]['lore']['BB'][item];
        if (unitData[unit]['lore']['rare'][item] === 6) {
          loreTOP += '<br><b>SBB: </b>' + unitData[unit]['lore']['SBB'][0];
        } else if (unitData[unit]['lore']['rare'][item] === 7){
          loreTOP += '<br><b>SBB: </b>' + unitData[unit]['lore']['SBB'][1];
          loreTOP += '<br><b>UBB: </b>' + unitData[unit]['lore']['UBB'];
          loreTOP += '<br><b>ES: </b>' + unitData[unit]['lore']['ES'];
        }
        loreTOP += '</div></div>';
          // loreTop += '<br><b>Fusion: </b>' + unitData[unit]['lore']['fusion'][item];
          // loreTop += '<br><b>Evolution: </b>' + unitData[unit]['lore']['evolution'][item]; 
      } else {
        loreTOP += '<div class="row"><div class="col-md-12">' + unitData[unit]['lore']['story'] + '</div>';
      }
    }

    var rel = '<h3><b>Related:</b></h3>';

    for (var relation in unitData[unit]['related']) {
      rel += ' ' + unitData[unit]['related'][relation] + ' |';
    }
    rel = rel.slice(0, -2);
    var infoStr = nameSTR + loreTOP + rel + '</div></div></div></div>';
    unitList.push({"name": unitData[unit]['name'], "collapsedInfo": infoStr, "home": unitData[unit]['home'], "batch": unitData[unit]['batch'], "names": unitData[unit]['lore']['names'], "element": unitData[unit]['element']});
    collapseID += 1;
  }
}

function buildSphere(sphereData) {
  for (var sphere in sphereData) {
    var nameSTR = '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#sphere' + sphereID + '">';
    nameSTR += '<img src="' + spherePrePath + sphereData[sphere]['thumbnail'] + '" width="40" height="40"/>';

    nameSTR += ' ' + sphere + '</h4></div><div id="sphere'+ sphereID + '" class="panel-collapse collapse"></a><div class="panel-body"><div class="container-fluid">';

    var loreTOP = '<div class="row row-eq-height"><div class="col-xs-12 col-sm-12"><h5 style = "text-align:left;"><b>Lore</b></h5>';

    loreTOP += sphereData[sphere]['story'] + '</div></div>';


    var rel = '<h5><b>Related:</b></h5>';

    for (var relation in sphereData[sphere]['related']) {
      rel += ' ' + sphereData[sphere]['related'][relation] + ' |';
    }
    rel = rel.slice(0, -2);
    var infoStr = nameSTR + loreTOP + rel + '</div></div></div></div>';
    sphereList.push({"name": sphere, "collapsedInfo": infoStr});
    sphereID += 1;
  }
}

$(document).on('click', '.location', function(e) {
  e.preventDefault();
  locSelect($(this).text());
})

$(document).on('click', '.element', function(e) {
  e.preventDefault();
  eleSelect($(this).text());
})

$(document).on('click', '.batches', function(e) {
  e.preventDefault();
  batchSelect($(this).text());
})

$(document).on('click', '#searchBatchBtn', function(e) {
  e.preventDefault();
  searchBatch($('#searchBatchBox').val());
})

$(document).on('click', '#searchNameBtn', function(e) {
  e.preventDefault();
  searchName($('#searchNameBox').val());
})

$(document).on('click', '#searchSphereBtn', function(e) {
  e.preventDefault();
  searchSphere($('#searchSphereBox').val());
})

$(document).on('click', '.unit_img', function(e) {
  $('#imageModal img').attr('src', $(this).attr('data-img-url'));
})
