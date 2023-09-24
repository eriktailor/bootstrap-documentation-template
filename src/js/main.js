$(document).ready(function() {

    /**
     * Build the sidebar menu dynamically from sections
     */
    $('section[id]').each(function() {
        var sectionId = $(this).attr('id');
        var navItem = $('<li class="nav-item"></li>');
        var navLink = $('<a class="nav-link"></a>').attr('href', '#' + sectionId).text(sectionId);
        
        // Find nested div elements within the section
        var nestedDivs = $(this).find('div[id]');

        if (nestedDivs.length > 0) {
            var subNav = $('<ul class="nav flex-column border-start ps-3"></ul>');

            // Create sub-navigation links for nested divs
            nestedDivs.each(function() {
                var divId = $(this).attr('id');
                var subNavItem = $('<li class="nav-item"></li>');
                var subNavLink = $('<a class="nav-link"></a>').attr('href', '#' + divId).text(divId);
                subNavItem.append(subNavLink);
                subNav.append(subNavItem);
            });

            navItem.append(navLink);
            navItem.append(subNav);

        } else {

            // if no nested divs found, create a regular navigation link
            navItem.append(navLink);
        }

        $('#docsMenu > ul.nav').append(navItem);
    });

});