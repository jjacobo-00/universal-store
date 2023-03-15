
// JBVALIDATION - START
function validateForm (formID) {
    let validatorServerSide = $(`form#${formID}`).jbvalidator({
        errorMessage: true,
        successClass: true,
        language: "https://emretulek.github.io/jbvalidator/dist/lang/en.json"
    });
    
    let check = true;
    $("div#body :input").each(function(){
        var val = $(this).val();
        let id = $(this).attr('id');
        let name = $(this).attr('name');
        let message = `${name} Required!`;
        if(val == '') {
            validatorServerSide.errorTrigger($(`#${id}`), message);
            check = false;
        }
    });
    return check;
}

function reloadForm (formID) {
    let validatorServerSide = $(formID).jbvalidator({
        errorMessage: true,
        successClass: true,
        language: "https://emretulek.github.io/jbvalidator/dist/lang/en.json"
    });

    validatorServerSide.reload();
}
// JBVALIDATION - END

// SWEETALERT - START
function sweetAlertYesNo (type, title) {
    Swal.fire({
        title: `${type} ${title}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#002451',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit'
      }).then((result) => {
        if (result.isConfirmed) {
            return true;
        }
    })
}
// SWEETALERT - END

