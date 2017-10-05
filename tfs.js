var tblTFS, lblCount;
var projects;

function getChangeSets(project) {
    $.ajax({
        url: 'http://code.positivo.local:8080/tfs/DefaultCollection/_apis/tfvc/changesets?searchCriteria.toDate&top&searchCriteria.itemPath=$/'+ project +'/&api-version=1.0',
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            tblTFS.append('<tr><td>' + project + '</td><td></td><td></td><td></td></tr>"');
        },
        success: function (resultado) {
            if (resultado.count > 0) {
                tblTFS.append('<tr><td>' + project + '</td><td>' + resultado.value[0].author.displayName + '</td><td>' + resultado.value[0].changesetId + '</td><td>' + resultado.value[0].createdDate + '</td></tr>"');
            } else {
                tblTFS.append('<tr><td>' + project + '</td><td></td><td></td><td></td></tr>"');
            }
        }
    });
}

function getProjects() {
    $.ajax({
        url: 'http://code.positivo.local:8080/tfs/DefaultCollection/_apis/projects?$top=200&$skip=1&api-version=1.0',
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        success: function (resultado) {
            if (resultado.count > 0) {
                projects = resultado.value;
            } else {
                projects = {};
            }
            lblCount.append('TFS: ' + resultado.count + ' Registros');
        }
    });
}

(function init() {
    tblTFS = $("#tblTFS");
    lblCount = $("#lblCount");
    getProjects()
    $(projects).each(function (index, obj) {
        getChangeSets(obj.name); 
    });
})();