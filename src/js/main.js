// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

$(document).ready(function() {

    /**
     * Page loader animation
     */
    document.onreadystatechange = function () {
        if (document.readyState !== 'complete') {
            document.querySelector('body').style.visibility = 'hidden';
            document.querySelector('#docsLoader').style.visibility = 'visible';
        } else {
            document.querySelector('#docsLoader').style.display = 'none';
            document.querySelector('body').style.visibility = 'visible';
        }
    };
    
    /**
     * Build dynamic sidebar menu from sections and divs
     */
    $('section[id]').each(function() {
        var sectionId = $(this).attr('id');
        var sectionTitle = sectionId[0].toUpperCase() + sectionId.slice(1).replace(/-/g, ' ');
        var navItem = $('<li class="nav-item"></li>');
        var navLink = $('<a class="nav-link"></a>').attr('href', '#' + sectionId).text(sectionTitle);
        
        // find nested div elements within the section
        var nestedDivs = $(this).children('div[id]');
    
        if (nestedDivs.length > 0) {
            var subNav = $('<ul class="nav flex-column border-start ps-3"></ul>');
    
            // create sub-navigation links for nested divs
            nestedDivs.each(function() {
                var divId = $(this).attr('id');
                var divTitle = divId[0].toUpperCase() + divId.slice(1).replace(/-/g, ' ');
                var subNavItem = $('<li class="nav-item"></li>');
                var subNavLink = $('<a class="nav-link"></a>').attr('href', '#' + divId).text(divTitle);
                subNavItem.append(subNavLink);
                subNav.append(subNavItem);
            });
    
            navItem.append(navLink);
            navItem.append(subNav);
    
        } else {
    
            // if no nested divs found, create a regular navigation link
            navItem.append(navLink);
        }
    
        // append the built output
        $('#docsMenu > ul.nav').append(navItem);
    });
    
    /**
     * Generate search result list items
     */
    $('section[id] h3').each(function() {
        var id = $(this).parent('div').attr('id');
        var heading = $(this).text();
        var parentId = $(this).closest('section').attr('id');
        var parentName = parentId[0].toUpperCase() + parentId.slice(1).replace(/-/g, ' ');
        
        // build search result list items
        var listItem  = '<a class="list-group-item list-group-item-action py-3 px-4" href="#'+id+'" style="display:none">';
            listItem += '<h4 class="mt-1">'+heading+'</h4>';
            listItem += '<small>in '+parentName+'</small>';
            listItem += '</a>';
    
        $('#searchResults').append(listItem);
    });
    
    /**
     * Dynamic search field
     */
    $('#docsSearch').on('input', function() {
        var searchText = $(this).val().toLowerCase();
    
        // hide all list items
        $('#searchResults a').hide();
        
        // loop through all divs
        $('div[id]').each(function() {
            var divContent = $(this).text().toLowerCase();
            
            // if content of div includes search input text
            if (divContent.indexOf(searchText) >= 0) {
                var id = $(this).attr('id');
                $('#searchResults a[href="#'+id+'"]').show();
            } 
        });
    
        // if search input is cleared
        if (!this.value) {
            $('#searchResults a').hide();
        }
    });
    
    /**
     * Clear search input and hide search results
     */
    function clearSearch() {
        $('#searchResults a').hide();
        $('#docsSearch').val('');
    }
    /**
     * Hide search results when it's clicked
     */
    $('#searchResults a').on('click', function(event) {
        var sectionId = $(this).attr('href');
        var w = $(window).width();
    
        clearSearch();
    
        // scroll offset bug fix
        if (w < 992) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(sectionId).offset().top - 70
            });
        }
    });
    
    /**
     * Hide search results when clicked outside of header
     */
    $('body').on('click', function(event) {    
        if (event.target.id == 'docsHeader') {
            return;
        } else {
            clearSearch();
        }
    });
    
    /**
     * Close sidebar on anchor link click
     */
    $('#docsSidebar .nav-link').on('click', function() {
        $('#docsSidebar').offcanvas('hide');
    });
    
});