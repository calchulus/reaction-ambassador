AmbassadorController = ShopController.extend({
  onBeforeAction: function(){
    var ambassador = ReactionCore.Collections.Packages.findOne({
      name: "reaction-ambassador"
      });
    var lowerCaseTitle = ambassador.settings.public.title.toLowerCase();
    var lowerCaseParams = this.params.customTitle.toLowerCase();
    if(! ambassador.enabled){
        this.render('notFound');
      } else if(lowerCaseTitle !== lowerCaseParams){
        this.render('notFound');
      } else {
        this.next();
    }
  }
});

Router.map(function(){
  this.route('dashboard/ambassador', {
    controller: ShopAdminController,
    path: '/dashboard/ambassador',
    template: 'ambassadorSettings',
    waitOn: function(){
      return ReactionCore.Subscriptions.Packages;
    }
  }),

    this.route('ambassadorPage', {
    controller: AmbassadorController,
    path: '/ambassador/:customTitle',
    template: 'ambassadorPage'
  })
});


