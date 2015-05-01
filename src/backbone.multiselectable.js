(function(root) {

    var Backbone = root.Backbone;

    var selectedKey = 'selected';

    var MultiSelectManager = function() {
        var _this = this;
        this.multiSelect = true;
        this.clearSelection();
    };


    _.extend(MultiSelectManager.prototype, Backbone.SelectionManager.prototype, {
        clearSelection: function() {
            this.selected = {};
        },
        _reSelected: function(obj) {
            delete this.selected[obj];
        },
        _setSelected: function(obj) {
            this.selected[obj] = true;
        },
        _isReselect: function(obj) {
            return this.selected[obj] === true;
        },
        getSelected: function(){
            return this.selected;
        }
    });




    var MultiSelectableCollection = Backbone.SelectableCollection.extend({
        constructor: function(options) {
            this.selectionManager = new MultiSelectManager();
            Backbone.Collection.prototype.constructor.apply(this, arguments);
            this.readSelection();
        },
        setSelected: function(model) {
            if (this.validateSelection(model)) {
                this.isReselect(model);
                this.selectionManager.setSelected(model.id);
                this.updateModels();
                this.triggerSelectionEvent('selectionChange');
            }
        },
        _isReselect: function(model) {
            return model.get(selectedKey) === true;
        },
        getSelected: function() {
            var selectedIds = _.keys(this.selectionManager.getSelected());
            return _.map(selectedIds, function(id) {
                return this.get(id);
            }, this);
        },
        updateModels: function() {
            var selectedMap = this.selectionManager.getSelected();
            this.each(function(model) {
                if (selectedMap[model.id]) {
                    model.set(selectedKey, true);
                }else {
                    model.set(selectedKey, false);
                }
            });
        },
        readSelection: function(){
            var whereObj = {};
            whereObj[selectedKey]=true;
            var selectedModels = this.where(whereObj);
            _.forEach(selectedModels, function(model){
                this.setSelected(model);
            }, this);
        },
        triggerSelectionEvent: function(eventName) {
            this.trigger(eventName, this.getSelected());
        },
        triggerErrorEvent: function(eventName, model) {
            this.trigger(eventName, model);
        }
    });

    Backbone.MultiSelectManager = MultiSelectManager;
    Backbone.MultiSelectableCollection = MultiSelectableCollection;

})(this);
