const nav = {
    sidemenu: (e) => {
        const open = '210';
        const close = '60';
        let width = $('#sidebar').width();

        if(width == 60) {
            $('#sidebar').animate({
                width: open
            });
            $(e.currentTarget).removeClass('fa-bars');
            $(e.currentTarget).addClass('fa-xmark');
            
            setTimeout(function() {
                $('.sidebar-ul-text').removeClass('d-none');
            }, 300);
            
        } else {
            $('#sidebar').animate({
                width: close
            });
            $(e.currentTarget).removeClass('fa-xmark');
            $(e.currentTarget).addClass('fa-bars');
            
            $('.sidebar-ul-text').addClass('d-none');
        }
    }
}

$(document).ready(function() { 
    $(document).on('click', '#menu-bar', (e) => nav.sidemenu(e));
});