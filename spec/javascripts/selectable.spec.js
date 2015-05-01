describe('Selectable', function() {
    var selectableCollection, selectionManager;

    beforeEach(function() {
        selectionManager = new Backbone.SelectionManager();
        selectableCollection = new Backbone.SelectableCollection([{id: 1, name: 'one'}, {id: 2, name: 'two'}, {id:3, name:'three', selected:true}, {name: 'noid'}]);
        selectableCollection.on('all', function(arg1, arg2, arg3) {
            //console.log(arg1, arg2, arg3);
        });
    });

    afterEach(function() {
        selectableCollection = null;
    });


    it('has selection manager', function() {
        expect(selectableCollection.selectionManager).toBeDefined();
    });

    it('selection manager validation pass', function() {
        expect(selectionManager.validateSelection('test')).toBeDefined();
    });

    it('selection manager validation fail', function() {
        expect(selectionManager.validateSelection()).toBeFalsy();
    });

    it('selection manager returns expected', function() {
        selectionManager.setSelected('ravi');
        expect(selectionManager.getSelected()).toBe('ravi');
    });

    it('selectable validation fails on missing model', function() {
        expect(selectableCollection.validateSelection()).toBeFalsy();
    });

    it('selectable validation fails on id missing', function() {
        expect(selectableCollection.validateSelection(selectableCollection.at(3))).toBeFalsy();
    });

    it('selectable validation fails on external model', function() {
        expect(selectableCollection.validateSelection(new Backbone.Model({id: 1, name: 'ravi'}))).toBeFalsy();
    });

    it('selectable validation pass', function() {
        expect(selectableCollection.validateSelection(selectableCollection.at(0))).toBeTruthy();
    });

    it('selectable selection works', function() {
        selectableCollection.setSelected(selectableCollection.at(0));
        var selected = selectableCollection.getSelected();
        expect(selected).toBeDefined();
    });

    it('selectable selection fail in missing model ', function() {
        selectableCollection.clearSelection();
        selectableCollection.setSelected();
        var selected = selectableCollection.getSelected();
        expect(selected).toBeUndefined();
    });

    it('read selection works as expected', function() {
        var selected = selectableCollection.getSelected();
        expect(selected).toBe(selectableCollection.get(3));
    });

    it('selectable selection works as expected ', function() {
        selectableCollection.setSelected(selectableCollection.get(1));
        var selected = selectableCollection.getSelected();
        expect(selected).toBe(selectableCollection.get(1));
    });

    it('selectable selection works as expected on second select ', function() {
        selectableCollection.setSelected(selectableCollection.get(1));
        selectableCollection.setSelected(selectableCollection.get(2));
        var selected = selectableCollection.getSelected();
        expect(selected).toBe(selectableCollection.get(2));
    });



});
