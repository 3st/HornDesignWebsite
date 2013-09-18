$( document ).ready( function() {
  
  // imageSizing()

  var imageSizing = function() {}

  // slides()

  var slides = function() {}

  // featureInfo()

  var featureInfo = function() {
    var featured_projects = $( '.featured_project' );

    featured_projects.each(function() {
      var self = $( this );

      self.on(
        'click', function() {
          // deactivate any active projects
          featured_projects.removeClass( 'active' );

          // activate selected project
          self.addClass( 'active' );
        }
      );

      self.find( '.action.info' ).on(
        'click', function() {
          // close any open projects
          featured_projects.removeClass( 'open' );

          // toggle info for selected project
          self.addClass( 'open' );
        }
      );

    });

    $( featured_projects[0] ).addClass( 'active' );
  }

  // touchMods()

  var touchMods = function() {

    if ( !Modernizr.touch ) return;

    // Hover fix, part i
    // capture touch events on elements classified as hovers
    // toggle 'active' class to simulate hover effect

    $( '.hovers' ).on( 'touchstart touchend', function( event ) {
        $( this ).toggleClass( 'active' );
    });


    // Hover fix, part ii
    // prevents default click/tap action until second click/tap
    // http://stackoverflow.com/questions/5507964/ios-automatic-hover-fix

    $( '.hovers > a' ).each( function() {
        var onClick;

        var firstClick = function() {
            onClick = secondClick;
            event.preventDefault();
            return false;
        };

        var secondClick = function() {
            onClick = firstClick;
            return true;
        };

        onClick = firstClick;

        $(this).click(function( event ) {
            return onClick();
        });

    });

  };



  // go

  imageSizing();
  slides();
  featureInfo();
  touchMods();

});
