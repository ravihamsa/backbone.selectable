/**
 * Created by ravi.hamsa on 30/04/15.
 */
(function (root) {

    var Backbone = root.Backbone;


    var SelectionManager = function () {
        var _this = this;
        this.clearSelection();
    }

    _.extend(SelectionManager.prototype, {
        setSelected: function (obj) {
            if (this.validateSelection(obj)) {
                this._setSelected(obj);
            }
        },
        validateSelection: function (obj) {
            if (obj === null || obj === undefined) {
                return false;
            }

            if (this._isReselect(obj)) {
                this._reSelected(obj);
                return false;
            }
        },
        _reSelected: function(){

        },
        _setSelected: function (obj) {
            this.prev = this.selected;
            this.selected = obj;
        },
        _isReselect: function (obj) {
            return obj === this.selected;
        },
        getSelected: function(){
            return this.selected;
        },
        getPrevSelected: function(){
            return this.prev;
        },
        clearSelection: function(){
            this.selected = null;
            this.prev = null;
        }
    });


    var SelectableCollection = Backbone.Collection.extend({
        constructor: function(options){
            this.multiSelect = options.multiSelect;
            this.selectionManager = new SelectionManager();
            Backbone.Collection.prototype.constructor.apply(this, arguments);
        },
        setSelected: function(model){
            if(this.validateSelection(model)){
                this.selectionManager.setSelected(model.id);
                this.triggerSelectionEvent('selectionChange');
            };
        },
        validateSelection: function(model){
            if(!model){
                this.triggerErrorEvent('modelMissing', model)
                return false;
            }

            if(!model.id){
                this.triggerErrorEvent('modelIdMissing', model)
                return false;
            }

            if(model.get('selecteable') === false){
                this.triggerErrorEvent('notSelectable', model)
                return false;
            }

            if(this._isReselect(model)){
                this.triggerSelectionEvent('reSelect')
                return false;
            }

            return true;
        },
        _isReselect: function(model){
            var selected = this.selectionManager.getSelected();
            if(!selected){
                return false;
            }
            if(selected === model.id){
                return true;
            }
        },
        getSelected: function(){
            var selectedId = this.selectionManager.getSelected();
            if(selectedId){
                return this.get(selectedId);
            }
        },
        getPrevSelected: function(){
            var prevSelectedId = this.selectionManager.getPrevSelected();
            if(prevSelectedId){
                return this.get(prevSelectedId);
            }
        },
        triggerSelectionEvent: function(eventName){
            this.trigger(eventName, this.getSelected(), this.getPrevSelected());
        },
        triggerErrorEvent: function(eventName, model){
            this.trigger(eventName, model);
        }
    })


})(this)