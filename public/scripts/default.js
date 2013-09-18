$( document ).ready( function() {
  
  // imageSizing()

  var imageSizing = function() {}

  // slides()

  var slides = function( theArea, animate ) {
    this.theArea = $( theArea ).first();

    this.figures = this.theArea.find( 'figure' );

    this.zindex = 1001 + this.figures.length;

    this.animate = animate || false;

    this.paused = true;
  }

  slides.prototype.init = function() {
    this.setFigures();
    this.setControls();
    this.setEvents();
  }

  slides.prototype.setFigures = function() {
    var self = this;
    var zindex = this.zindex;

    self.figures.each(function() {

      var figure = $( this );

      var image = figure.find( 'img' ).first();

      var path = image.attr( 'src' );

      if ( path ) {
        figure.backstretch( path );
        image.remove();
      }

      zindex -= 1;

      figure.css( { 'z-index': zindex } )

    });
  }

  slides.prototype.setControls = function() {
    var self = this;
    var controls = this.theArea.find( '.slide-controls' ).first();

    if ( this.animate == false ) return;
    if ( !controls ) return;

    var previous, next, play;
    
    if ( previous = controls.find( '.action.previous' ).first() )
      this.previous = previous;

    if ( next = controls.find( '.action.next' ).first() )
      this.next = next;

    if ( play = controls.find( '.action.play' ).first() )
      this.play = play;

    this.previous.on( 'click', function() {
      self.theArea.trigger( 'previousSlide' );
    });

    this.next.on( 'click', function() {
      self.theArea.trigger( 'nextSlide' );
    });

    this.play.on( 'click', function() {
      console.log( self.playing );

      if ( self.paused ) {
        self.theArea.trigger( 'playSlideshow' );
      } else {
        self.theArea.trigger( 'pauseSlideshow' );
      }
      
      
    });

  }

  slides.prototype.setEvents = function() {
    var self = this;

    this.theArea.on( 'previousSlide', function() {
      self.previousSlide();
    })

    this.theArea.on( 'nextSlide', function() {
      self.nextSlide();
    })

    this.theArea.on( 'playSlideshow', function() {
      self.playSlideshow();
    })

    this.theArea.on( 'pauseSlideshow', function() {
      self.pauseSlideshow();
    })
  }

  slides.prototype.getFigures = function( limit ) {
    if ( limit == 'passed' ) {
      return this.figures.parent().find( 'figure:hidden' );
    } else if ( limit == 'remaining' ) {
      return this.figures.parent().find( 'figure:visible' );
    } else {
      return this.figures;
    }
  }

  slides.prototype.showAll = function() {
    this.figures.first().fadeIn( 800 );
    this.figures.delay( 800 ).fadeIn( 400 );
  }

  slides.prototype.previousSlide = function() {
    console.log( 'the last slide is wanted' );

    var hiddenFigures = this.getFigures( 'passed' );

    hiddenFigures.last().fadeIn( 800 );
  }

  slides.prototype.nextSlide = function() {
    var self = this;
    var availableFigures = this.getFigures( 'remaining' );

    if ( availableFigures.length > 1 ) {
      availableFigures.first().fadeOut( 800 );
    } else {
      this.showAll();
    }
    
  }

  slides.prototype.playSlideshow = function() {
    console.log( 'play the slideshow' );

    var self = this;

    var advance = function() {
      self.nextSlide();
    }

    this.playing = window.setInterval( advance, 3000 );

    this.paused = false;
  }

  slides.prototype.pauseSlideshow = function() {
    var self = this;

    window.clearInterval( self.playing );

    this.paused = true;
  }

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


// slides( '.featured_project-illustrations' );
var projectImages = new slides( '.slides.large', true );
projectImages.init();

});
