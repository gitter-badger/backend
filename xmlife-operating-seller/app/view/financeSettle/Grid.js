Ext.define("Ext.grid.infinite.Row", {
    extend: 'Ext.Component',
    xtype: "gridrow",
    config: {
        baseCls: Ext.baseCSSPrefix + "grid-row",
        index: 0,
        columns: null,
        renderedCellCount: null,
        columnPositionMap: null,
        minimumBufferDistance: 3,
        bufferSize: 12
    },
    leftRenderedIndex: 0,
    leftVisibleIndex: 0,
    constructor: function() {
        this.cells = [];
        this.updatedCells = [];
        this.offsets = {};
        this.widths = {};
        this.callParent(arguments)
    },
    createCell: function() {
        var b = this.self.prototype,
        a, f, d, c, e;
        if (!b.hasOwnProperty("cellRenderTemplate")) {
            b.cellRenderTemplate = a = document.createDocumentFragment();
            a.appendChild(Ext.Element.create(this.getCellElementConfig(), true));
            f = a.querySelectorAll("[id]");
            for (c = 0, e = f.length; c < e; c++) {
                d = f[c];
                d.removeAttribute("id")
            }
        }
        return b.cellRenderTemplate.cloneNode(true).firstChild
    },
    getCellElementConfig: function() {
        var a = {
            tag: "div",
            cls: Ext.baseCSSPrefix + "grid-cell"
        };
        return a
    },
    onTranslate: function(a) {
        var b = this;
        if (b.cells.length) {
            b.handleCellUpdates(a);
            b.handleCellDimensions()
        }
    },
    handleCellUpdates: function(o) {
        var t = this,
        d = t.getColumnPositionMap(),
        g = t.cells,
        m = g.length,
        c = t.getColumns(),
        s = c.length - 1,
        k = t.getBufferSize(),
        f = t.getRecord(),
        p = t.getIndex(),
        j = t.getMinimumBufferDistance(),
        u = t.leftVisibleIndex,
        l = t.leftRenderedIndex,
        q,
        a,
        h,
        n,
        b,
        r,
        e;
        t.leftVisibleIndex = q = Math.max(0, d.findIndex( - o) || 0);
        if (u !== q) {
            if (u > q) {
                a = q - l;
                if (a < j) {
                    h = Math.min(m, j - a);
                    for (r = 0; r < h; r++) {
                        n = l - r - 1;
                        if (n < 0) {
                            break
                        }
                        b = g.pop();
                        g.unshift(b);
                        e = c[n];
                        t.updateCell(b, e, f, p);
                        t.updatedCells.push(b);
                        t.leftRenderedIndex--
                    }
                }
            } else {
                a = l + k - q;
                if (a < j) {
                    h = Math.min(m, j - a);
                    for (r = 0; r < h; r++) {
                        n = l + m + r;
                        if (n > s) {
                            break
                        }
                        b = g.shift();
                        g.push(b);
                        e = c[n];
                        t.updateCell(b, e, f, p);
                        t.updatedCells.push(b);
                        t.leftRenderedIndex++
                    }
                }
            }
        }
    },
    handleCellDimensions: function() {
        var i = this,
        k = i.cells,
        d = i.widths,
        e = i.offsets,
        g = i.updatedCells,
        l = i.getColumnPositionMap(),
        a = i.leftRenderedIndex,
        b,
        f,
        j,
        c,
        h;
        while (j = g.shift()) {
            h = k.indexOf(j);
            c = Ext.get(j);
            b = l.getItemHeight(h + a);
            f = l.map[h + a];
            if (b !== d[j.id]) {
                c.setWidth(b);
                d[j.id] = b
            }
            if (f !== e[j.id]) {
                c.translate(f);
                e[j.id] = f
            }
        }
    },
    updateRenderedCellCount: function(g) {
        var f = this,
        e = f.element,
        k = f.cells,
        j = k.length,
        a = f.getBufferSize(),
        c = g + a,
        b = c - j,
        d,
        h;
        for (d = 0; d < b; d++) {
            h = f.createCell(j + d);
            e.appendChild(h);
            k.push(h);
            f.updatedCells.push(h)
        }
        for (d = b; d < 0; d++) {
            e.removeChild(k.pop())
        }
    },
    updateRecord: function(e) {
        var h = this,
        f = h.getIndex(),
        c = h.getColumns(),
        k = h.cells,
        a = h.leftRenderedIndex,
        d,
        g,
        j,
        b;
        for (d = 0, g = k.length; d < g; d++) {
            j = k[d];
            b = c[d + a];
            h.updateCell(j, b, e, f)
        }
    },
    updateCell: function(a, d, b, c) {
        var e = this;
        b = b || e.getRecord();
        c = c || e.getIndex();
        a.innerHTML = b && d ? d.getCellContent(b, e, c) : ""
    }
});
Ext.define("Ext.grid.Row", {
    extend: 'Ext.Component',
    xtype: "gridrow",
    config: {
        baseCls: Ext.baseCSSPrefix + "grid-row",
        grid: null
    },
    constructor: function() {
        this.cells = [];
        this.columnMap = {};
        this.callParent(arguments)
    },
    updateGrid: function(c) {
        var e = this,
        b, a, d;
        e.element.innerHTML = "";
        e.cells = [];
        if (c) {
            a = c.getColumns();
            for (b = 0, d = a.length; b < d; b++) {
                e.addColumn(a[b])
            }
        }
    },
    addColumn: function(a) {
        this.insertColumn(this.cells.length, a)
    },
    insertColumn: function(h, c) {
        if (this.getCellByColumn(c)) {
            return
        }
        var i = this,
        e = i.element,
        l = i.cells,
        g = i.columnMap,
        j = i.createCell(h),
        d = i.cells[h],
        a = c.getCellCls(),
        b = Ext.get(j),
        f = this.getRecord(),
        k = [];
        j.$column = c;
        j.style.width = c.getWidth() + "px";
        if (c.isHidden()) {
            j.style.display = "none"
        }
        k.push(Ext.baseCSSPrefix + "grid-cell-align-" + c.getAlign());
        if (a) {
            k.push(a)
        }
        b.addCls(k);
        if (f) {
            c.updateCell(j, f)
        }
        if (d) {
            e.dom.insertBefore(j, d);
            l.splice(h, 0, j)
        } else {
            e.dom.appendChild(j);
            l.push(j)
        }
        g[c.getId()] = j
    },
    removeColumn: function(d) {
        var e = this,
        b = e.columnMap,
        c = e.element,
        f = d.getId(),
        a = b[f];
        delete a.$column;
        if (a) {
            c.removeChild(a)
        }
        Ext.Array.remove(e.cells, a);
        delete b[f]
    },
    updateRecord: function(b) {
        var g = this,
        c = g.cells,
        d, f, a, e;
        for (d = 0, f = c.length; d < f; d++) {
            a = c[d];
            e = g.getColumnByCell(a);
            e.updateCell(a, b)
        }
    },
    setColumnWidth: function(c, b) {
        var a = this.getCellByColumn(c);
        if (a) {
            a.style.width = b + "px"
        }
    },
    showColumn: function(b) {
        var a = this.getCellByColumn(b);
        if (a) {
            a.style.display = ""
        }
    },
    hideColumn: function(b) {
        var a = this.getCellByColumn(b);
        if (a) {
            a.style.display = "none"
        }
    },
    getCellByColumn: function(a) {
        return this.columnMap[a.getId()]
    },
    getColumnByCell: function(a) {
        return a.$column
    },
    createCell: function() {
        var b = this.self.prototype,
        a, f, d, c, e;
        if (!b.hasOwnProperty("cellRenderTemplate")) {
            b.cellRenderTemplate = a = document.createDocumentFragment();
            a.appendChild(Ext.Element.create(this.getCellElementConfig(), true));
            f = a.querySelectorAll("[id]");
            for (c = 0, e = f.length; c < e; c++) {
                d = f[c];
                d.removeAttribute("id")
            }
        }
        return b.cellRenderTemplate.cloneNode(true).firstChild
    },
    getCellElementConfig: function() {
        var a = {
            tag: "div",
            cls: Ext.baseCSSPrefix + "grid-cell",
            html: "&nbsp;"
        };
        return a
    }
});
Ext.define("Ext.grid.column.Column", {
    extend: 'Ext.Component',
    xtype: "column",
    config: {
        dataIndex: null,
        text: "&nbsp;",
        sortable: true,
        resizable: true,
        hideable: true,
        renderer: false,
        scope: null,
        align: "left",
        editable: false,
        editor: null,
        defaultEditor: {
            xtype: "textfield",
            required: true
        },
        ignore: false,
        summaryType: null,
        summaryRenderer: null,
        minWidth: 20,
        baseCls: Ext.baseCSSPrefix + "grid-column",
        cellCls: null,
        sortedCls: Ext.baseCSSPrefix + "column-sorted",
        sortDirection: null
    },
    updateAlign: function(b, a) {
        if (a) {
            this.removeCls(Ext.baseCSSPrefix + "grid-column-align-" + b)
        }
        if (b) {
            this.addCls(Ext.baseCSSPrefix + "grid-column-align-" + b)
        }
    },
    initialize: function() {
        this.callParent();
        this.element.on({
            tap: "onColumnTap",
            longpress: "onColumnLongPress",
            scope: this
        })
    },
    onColumnTap: function(a) {
        this.fireEvent("tap", this, a)
    },
    onColumnLongPress: function(a) {
        this.fireEvent("longpress", this, a)
    },
    updateText: function(a) {
        this.setHtml(a)
    },
    doSetWidth: function(a) {
        this.callParent(arguments);
        this.fireEvent("columnresize", this, a)
    },
    updateDataIndex: function(a) {
        var b = this.getEditor();
        if (b) {
            b.name = a
        } else {
            this.getDefaultEditor().name = a
        }
    },
    updateSortDirection: function(c, a) {
        if (!this.getSortable()) {
            return
        }
        var b = this.getSortedCls();
        if (a) {
            this.element.removeCls(b + "-" + a.toLowerCase())
        }
        if (c) {
            this.element.addCls(b + "-" + c.toLowerCase())
        }
        this.fireEvent("sort", this, c, a)
    },
    getCellContent: function(a) {
        var d = this,
        b = d.getDataIndex(),
        f = d.getRenderer(),
        c = d.getScope(),
        e = b && a.get(b);
        return f ? f.call(c || d, e, a, b) : d.defaultRenderer(e, a)
    },
    defaultRenderer: function(a) {
        return a
    },
    updateCell: function(a, b, c) {
        if (a && (b || c)) {
            a.firstChild.nodeValue = c || this.getCellContent(b)
        }
    }
});
Ext.define("Ext.grid.column.Date", {
    extend: 'Ext.grid.column.Column',
    xtype: "datecolumn",
    config: {
        format: undefined
    },
    applyFormat: function(a) {
        if (!a) {
            a = Ext.Date.defaultFormat
        }
        return a
    },
    updateFormat: function(a) {
        this.getDefaultEditor().dateFormat = a
    },
    defaultRenderer: function(a) {
        return Ext.util.Format.date(a, this.getFormat())
    }
});
Ext.define("Ext.grid.column.Template", {
    extend: 'Ext.grid.column.Column',
    xtype: "templatecolumn",
    config: {
        tpl: null
    },
    applyTpl: function(a) {
        if (Ext.isPrimitive(a) || !a.compile) {
            a = new Ext.XTemplate(a)
        }
        return a
    },
    defaultRenderer: function(b, a) {
        return this.getTpl().apply(a.getData(true))
    },
    updateCell: function(a, b, c) {
        if (a && (b || c)) {
            a.innerHTML = c || this.getCellContent(b)
        }
    }
});
Ext.define("Ext.grid.HeaderContainer", {
    extend: Ext.Container,
    xtype: "headercontainer",
    config: {
        baseCls: Ext.baseCSSPrefix + "grid-header-container",
        height: 65,
        docked: "top",
        translationMethod: "auto",
        defaultType: "column"
    },
    initialize: function() {
        var a = this;
        a.columns = [];
        a.callParent();
        a.on({
            tap: "onHeaderTap",
            columnresize: "onColumnResize",
            show: "onColumnShow",
            hide: "onColumnHide",
            sort: "onColumnSort",
            scope: a,
            delegate: "column"
        });
        a.on({
            show: "onGroupShow",
            hide: "onGroupHide",
            add: "onColumnAdd",
            remove: "onColumnRemove",
            scope: a,
            delegate: "gridheadergroup"
        });
        a.on({
            add: "onColumnAdd",
            remove: "onColumnRemove",
            scope: a
        });
        if (Ext.browser.getPreferredTranslationMethod({
            translationMethod: this.getTranslationMethod()
        }) == "scrollposition") {
            a.innerElement.setLeft(500000)
        }
    },
    getColumns: function() {
        return this.columns
    },
    getAbsoluteColumnIndex: function(d) {
        var a = this.getInnerItems(),
        f = a.length,
        b = 0,
        g,
        c,
        e;
        for (c = 0; c < f; c++) {
            e = a[c];
            if (e === d) {
                return b
            } else {
                if (e.isHeaderGroup) {
                    g = e.innerIndexOf(d);
                    if (g !== -1) {
                        b += g;
                        return b
                    } else {
                        b += e.getInnerItems().length
                    }
                } else {
                    b += 1
                }
            }
        }
    },
    onColumnAdd: function(f, e) {
        var h = this,
        c = h.columns,
        d = h.getAbsoluteColumnIndex(e),
        a,
        g,
        b;
        if (e.isHeaderGroup) {
            a = e.getItems().items;
            for (b = 0, g = a.length; b < g; b++) {
                c.splice(d + b, 0, a[b]);
                h.fireEvent("columnadd", h, a[b], e)
            }
        } else {
            c.splice(d, 0, e);
            h.fireEvent("columnadd", h, e, null)
        }
    },
    onColumnRemove: function(d, c) {
        if (c.isHeaderGroup) {
            var b = c.getItems().items,
            e = b.length,
            a;
            for (a = 0; a < e; a++) {
                Ext.Array.remove(this.columns, b[a]);
                this.fireEvent("columnremove", this, b[a])
            }
        } else {
            Ext.Array.remove(this.columns, c);
            this.fireEvent("columnremove", this, c)
        }
    },
    onHeaderTap: function(b) {
        if (!b.getIgnore() && b.getSortable()) {
            var c = b.getSortDirection() || "DESC",
            a = (c === "DESC") ? "ASC": "DESC";
            b.setSortDirection(a)
        }
        this.fireEvent("columntap", this, b)
    },
    onColumnShow: function(a) {
        this.fireEvent("columnshow", this, a)
    },
    onColumnHide: function(a) {
        this.fireEvent("columnhide", this, a)
    },
    onGroupShow: function(e) {
        var b = e.getInnerItems(),
        d = b.length,
        a,
        c;
        for (a = 0; a < d; a++) {
            c = b[a];
            if (!c.isHidden()) {
                this.fireEvent("columnshow", this, c)
            }
        }
    },
    onGroupHide: function(e) {
        var b = e.getInnerItems(),
        d = b.length,
        a,
        c;
        for (a = 0; a < d; a++) {
            c = b[a];
            this.fireEvent("columnhide", this, c)
        }
    },
    onColumnResize: function(b, a) {
        this.fireEvent("columnresize", this, b, a)
    },
    onColumnSort: function(b, c, a) {
        if (c !== null) {
            this.fireEvent("columnsort", this, b, c, a)
        }
    },
    scrollTo: function(a) {
        switch (Ext.browser.getPreferredTranslationMethod({
            translationMethod: this.getTranslationMethod()
        })) {
        case "scrollposition":
            this.renderElement.dom.scrollLeft = 500000 - a;
            break;
        case "csstransform":
            this.innerElement.translate(a, 0);
            break
        }
    }
});
Ext.define("Ext.grid.HeaderGroup", {
    extend: 'Ext.Container',
    alias: "widget.gridheadergroup",
    isHeaderGroup: true,
    config: {
        text: "&nbsp;",
        defaultType: "column",
        baseCls: Ext.baseCSSPrefix + "grid-headergroup",
        hidden: true
    },
    updateText: function(a) {
        this.setHtml(a)
    },
    initialize: function() {
        this.on({
            add: "doVisibilityCheck",
            remove: "doVisibilityCheck"
        });
        this.on({
            show: "doVisibilityCheck",
            hide: "doVisibilityCheck",
            delegate: "> column"
        });
        this.callParent(arguments);
        this.doVisibilityCheck()
    },
    doVisibilityCheck: function() {
        var b = this.getInnerItems(),
        d = b.length,
        a,
        c;
        for (a = 0; a < d; a++) {
            c = b[a];
            if (!c.isHidden()) {
                if (this.isHidden()) {
                    if (this.initialized) {
                        this.show()
                    } else {
                        this.setHidden(false)
                    }
                }
                return
            }
        }
        this.hide()
    }
});
Ext.define("Ext.grid.infinite.Grid", {
    extend: 'Ext.Container',
    alias: "widget.grid",
    mixins: ['Ext.mixin.Selectable', 'Ext.mixin.Bindable'],
    xtype: "grid",
    config: {
        columns: null,
        store: null,
        data: null,
        baseCls: Ext.baseCSSPrefix + "grid",
        emptyText: null,
        deferEmptyText: true,
        loadingText: "Loading...",
        variableHeights: false,
        layout: "fit",
        defaultType: "gridrow",
        rowCls: null,
        selectedCls: Ext.baseCSSPrefix + "row-selected",
        minimumRowHeight: 30,
        bufferSize: 10,
        minimumBufferDistance: 3
    },
    storeEventHooks: {
        beforeload: "onBeforeLoad",
        load: "onLoad",
        refresh: "refresh",
        addrecords: "onStoreAdd",
        removerecords: "onStoreRemove",
        updaterecord: "onStoreUpdate"
    },
    hasLoadedStore: false,
    constructor: function() {
        var a = this;
        a.mixins.selectable.constructor.apply(a, arguments);
        a.callParent(arguments)
    },
    beforeInitialize: function() {
        var c = this,
        a, d, b;
        Ext.apply(c, {
            rows: [],
            offsets: {},
            updatedRows: [],
            topRenderedIndex: 0,
            topVisibleIndex: 0,
            currentX: null,
            currentY: null,
            rowPositionMap: Ext.create("Ext.util.PositionMap", {
                minimumHeight: c.getMinimumRowHeight()
            }),
            columnPositionMap: Ext.create("Ext.util.PositionMap", {
                minimumHeight: 20
            })
        });
        this.translationMethod = Ext.browser.is.AndroidStock2 ? "cssposition": "csstransform";
        a = c.container = Ext.factory({
            xtype: "container",
            scrollable: {
                scroller: {
                    autoRefresh: false,
                    direction: "both"
                }
            }
        });
        c.add(a);
        a.element.on({
            resize: "onContainerResize",
            scope: c
        });
        d = a.getScrollable();
        b = c.scrollViewElement = d.getElement();
        c.scrollElement = d.getScroller().getElement();
        c.setScrollable(d);
        c.scrollableBehavior = a.getScrollableBehavior();
        c.bind(d.getScroller().getTranslatable(), "doTranslate", "onTranslate")
    },
    onContainerResize: function(a, b) {
        var c = this;
        c.visibleRowCount = Math.ceil(b.height / c.getMinimumRowHeight());
        c.visibleColumnCount = this.determineMaxVisibleColumnCount(b.width);
        c.containerHeight = b.height;
        c.setRenderedRowCount(c.visibleRowCount + 1)
    },
    onTranslate: function(a, h) {
        var e = this,
        b = e.getStore(),
        g = b && b.getCount(),
        f = e.rows,
        c,
        d;
        if (!g) {
            e.showEmptyText()
        } else {
            if (e.rowCount) {
                if (h !== e.currentY) {
                    e.handleRowUpdates(h)
                }
                if (a !== e.currentX) {
                    for (c = 0, d = f.length; c < d; c++) {
                        f[c].onTranslate(a)
                    }
                    e.currentX = a
                }
                if (h !== e.currentY) {
                    e.handleRowTransforms();
                    e.currentY = h
                }
            }
        }
    },
    handleRowUpdates: function(l) {
        var j = this,
        q = j.rowPositionMap,
        r = j.rows,
        m = r.length,
        o = j.getStore(),
        f = o.getCount() - 1,
        a = j.getBufferSize(),
        n = j.getMinimumBufferDistance(),
        b = j.topVisibleIndex,
        e = j.topRenderedIndex,
        h,
        g,
        d,
        k,
        p,
        c;
        j.topVisibleIndex = h = Math.max(0, q.findIndex( - l) || 0);
        if (b !== h) {
            if (b > h) {
                g = h - e;
                if (g < n) {
                    d = Math.min(m, n - g);
                    for (c = 0; c < d; c++) {
                        k = e - c - 1;
                        if (k < 0) {
                            break
                        }
                        p = r.pop();
                        r.unshift(p);
                        j.updateRow(p, k);
                        j.topRenderedIndex--
                    }
                }
            } else {
                g = e + a - h;
                if (g < n) {
                    d = Math.min(m, n - g);
                    for (c = 0; c < d; c++) {
                        k = e + m + c;
                        if (k > f) {
                            break
                        }
                        p = r.shift();
                        r.push(p);
                        j.updateRow(p, k);
                        j.topRenderedIndex++
                    }
                }
            }
        }
    },
    handleRowTransforms: function() {
        var b = this,
        a = b.offsets,
        f = b.updatedRows,
        c = b.rowPositionMap,
        e, d;
        while (d = f.shift()) {
            e = c.map[d.getIndex()];
            if (e !== a[d.id]) {
                d.translate(0, e);
                a[d.id] = e
            }
        }
    },
    applyColumns: function(b) {
        var a, d, c;
        if (b) {
            if (!Ext.isArray(b)) {
                b = [b]
            }
            for (a = 0, d = b.length; a < d; a++) {
                c = b[a];
                if (!c.isComponent) {
                    c = Ext.factory(c, Ext.grid.column.Column);
                    b[a] = c
                }
            }
        }
        return b
    },
    updateColumns: function(b) {
        if (b && b.length) {
            var e = this,
            d = b.length,
            a, c;
            e.columnPositionMap.populate(d);
            for (a = 0; a < d; a++) {
                c = b[a];
                e.columnPositionMap.setItemHeight(a, c.getWidth())
            }
            e.columnPositionMap.update();
            e.scrollElement.setWidth(e.columnPositionMap.getTotalHeight())
        }
    },
    determineMaxVisibleColumnCount: function(a) {
        var h = this,
        k = h.columnPositionMap,
        c = 0,
        f, b, e, d, g;
        for (e = 0, g = k.map.length; e < g; e++) {
            f = b = 0;
            d = e;
            while (b < a && d < g) {
                b += k.getItemHeight(d);
                f++;
                d++
            }
            if (f > c) {
                c = f
            }
        }
        return c
    },
    setRenderedRowCount: function(a) {
        var d = this,
        e = d.rows,
        b = d.getRowConfig(),
        f = a + d.getBufferSize() - e.length,
        c;
        for (c = 0; c < f; c++) {
            d.createRow(b)
        }
        for (c = f; c < 0; c++) {
            e.pop().destroy()
        }
        d.rowCount = a;
        d.updateAllRows();
        return d.rows
    },
    getRowConfig: function() {
        var a = this;
        return {
            xtype: a.getDefaultType(),
            minHeight: a.rowPositionMap.getMinimumHeight(),
            columns: a.getColumns(),
            cls: a.getRowCls(),
            columnPositionMap: a.columnPositionMap,
            translatable: {
                translationMethod: this.translationMethod
            }
        }
    },
    createRow: function(b) {
        var c = this,
        a = c.container,
        d = c.rows,
        e;
        e = Ext.factory(b);
        e.grid = c;
        e.$height = b.minHeight;
        a.doAdd(e);
        d.push(e);
        return e
    },
    updateAllRows: function() {
        var d = this,
        e = d.rows,
        a = d.getStore(),
        f = d.topRenderedIndex,
        b,
        c;
        if (d.hasLoadedStore) {
            for (b = 0, c = e.length; b < c; b++) {
                d.updateRow(e[b], f + b)
            }
            if (a.getCount()) {
                d.scrollElement.setHeight(d.rowPositionMap.getTotalHeight())
            } else {
                d.scrollElement.setHeight(d.containerHeight)
            }
        }
        d.refreshScroller()
    },
    updateRow: function(m, e) {
        var h = this,
        l = h.getStore(),
        c = l.getAt(e),
        j = h.updatedRows,
        d = h.getSelectedCls(),
        a = [],
        g = [d],
        k = m.renderElement.classList,
        b,
        f;
        m.$position = -10000;
        if (!c) {
            m.setRecord(null);
            m.translate(0, -10000);
            m.$hidden = true;
            return
        } else {
            if (m.$hidden) {
                m.$hidden = false
            }
        }
        j.push(m);
        m.setIndex(e);
        m.setRenderedCellCount(h.visibleColumnCount);
        if (m.getRecord() === c) {
            m.updateRecord(c)
        } else {
            m.setRecord(c)
        }
        if (h.isSelected(c)) {
            a.push(d)
        }
        if (k) {
            for (b = 0, f = g.length; b < f; b++) {
                Ext.Array.remove(k, g[b])
            }
            a = Ext.Array.merge(a, k)
        }
        m.renderElement.setCls(a)
    },
    refreshScroller: function() {
        var a = this;
        if (a.isPainted()) {
            a.container.getScrollable().getScroller().refresh()
        }
    },
    refresh: function() {
        var b = this,
        a = b.container;
        if (!b.getStore()) {
            if (!b.hasLoadedStore && !b.getDeferEmptyText()) {
                b.showEmptyText()
            }
            return
        }
        if (a) {
            b.fireAction("refresh", [b], "doRefresh")
        }
    },
    doRefresh: function() {
        var b = this,
        c = b.rows,
        a = b.getStore(),
        d = a.getCount();
        b.rowPositionMap.populate(d, this.topRenderedIndex);
        if (c.length) {
            if (d) {
                b.hideEmptyText()
            }
            b.updateAllRows()
        }
    },
    onBeforeLoad: function() {
        var a = this.getLoadingText();
        if (a && this.isPainted()) {
            this.setMasked({
                xtype: "loadmask",
                message: a
            })
        }
        this.hideEmptyText()
    },
    updateData: function(b) {
        var a = this.getStore();
        if (!a) {
            this.setStore(Ext.create("Ext.data.Store", {
                data: b,
                autoDestroy: true
            }))
        } else {
            a.add(b)
        }
    },
    applyStore: function(b) {
        var d = this,
        e = Ext.apply({},
        d.storeEventHooks, {
            scope: d
        }),
        c,
        a;
        if (b) {
            b = Ext.data.StoreManager.lookup(b);
            if (b && Ext.isObject(b) && b.isStore) {
                b.on(e);
                c = b.getProxy();
                if (c) {
                    a = c.getReader();
                    if (a) {
                        a.on("exception", "handleException", this)
                    }
                }
            }
        }
        return b
    },
    handleException: function() {
        this.setMasked(false)
    },
    updateStore: function(b, e) {
        var d = this,
        f = Ext.apply({},
        d.storeEventHooks, {
            scope: d
        }),
        c,
        a;
        if (e && Ext.isObject(e) && e.isStore) {
            e.un(f);
            if (!d.isDestroyed) {
                d.onStoreClear()
            }
            if (e.getAutoDestroy()) {
                e.destroy()
            } else {
                c = e.getProxy();
                if (c) {
                    a = c.getReader();
                    if (a) {
                        a.un("exception", "handleException", this)
                    }
                }
            }
        }
        if (b) {
            if (b.isLoaded()) {
                this.hasLoadedStore = true;
                d.refresh()
            }
            if (b.isLoading()) {
                d.onBeforeLoad()
            }
        }
    },
    updateEmptyText: function(c, d) {
        var b = this,
        a;
        if (d && b.emptyTextCmp) {
            b.remove(b.emptyTextCmp, true);
            delete b.emptyTextCmp
        }
        if (c) {
            b.emptyTextCmp = b.add({
                xtype: "component",
                cls: b.getBaseCls() + "-emptytext",
                html: c,
                hidden: true
            });
            a = b.getStore();
            if (a && b.hasLoadedStore && !a.getCount()) {
                this.showEmptyText()
            }
        }
    },
    onLoad: function(a) {
        this.hasLoadedStore = true;
        this.setMasked(false);
        if (!a.getCount()) {
            this.showEmptyText()
        }
    },
    onStoreAdd: function() {
        this.doRefresh()
    },
    onStoreRemove: function() {
        this.doRefresh()
    },
    onStoreUpdate: function() {
        this.doRefresh()
    },
    onStoreClear: function() {
        this.doRefresh()
    },
    showEmptyText: function() {
        if (this.getEmptyText() && (this.hasLoadedStore || !this.getDeferEmptyText())) {
            this.emptyTextCmp.show()
        }
    },
    hideEmptyText: function() {
        if (this.getEmptyText()) {
            this.emptyTextCmp.hide()
        }
    }
});
Ext.define("Ext.grid.Grid", {
    extend: 'Ext.List',
    xtype: "grid",
    config: {
        defaultType: "gridrow",
        infinite: true,
        columns: null,
        baseCls: Ext.baseCSSPrefix + "grid",
        useHeaders: false,
        itemHeight: 60,
        variableHeights: false,
        headerContainer: {
            xtype: "headercontainer"
        },
        striped: true,
        itemCls: Ext.baseCSSPrefix + "list-item",
        scrollToTopOnRefresh: false,
        titleBar: {
            xtype: "titlebar",
            docked: "top"
        },
        title: ""
    },
    platformConfig: [{
        theme: ["Windows"],
        itemHeight: 60
    }],
    beforeInitialize: function() {
        this.container = Ext.factory({
            xtype: "container",
            scrollable: {
                scroller: {
                    autoRefresh: false,
                    direction: "auto",
                    directionLock: true
                }
            }
        });
        this.callParent()
    },
    initialize: function() {
        var c = this,
        a = c.getTitleBar(),
        b = c.getHeaderContainer();
        c.callParent();
        if (a) {
            c.container.add(c.getTitleBar())
        }
        c.container.doAdd(b);
        c.scrollElement.addCls(Ext.baseCSSPrefix + "grid-scrollelement")
    },
    onTranslate: function(a) {
        this.callParent(arguments);
        this.getHeaderContainer().scrollTo(a)
    },
    applyTitleBar: function(a) {
        if (a && !a.isComponent) {
            a = Ext.factory(a, Ext.TitleBar)
        }
        return a
    },
    updateTitle: function(b) {
        var a = this.getTitleBar();
        if (a) {
            this.getTitleBar().setTitle(b)
        }
    },
    applyHeaderContainer: function(a) {
        if (a && !a.isComponent) {
            a = Ext.factory(a, Ext.grid.HeaderContainer)
        }
        return a
    },
    updateHeaderContainer: function(c, a) {
        var b = this;
        if (a) {
            a.un({
                columnsort: "onColumnSort",
                columnresize: "onColumnResize",
                columnshow: "onColumnShow",
                columnhide: "onColumnHide",
                columnadd: "onColumnAdd",
                columnremove: "onColumnRemove",
                scope: b
            })
        }
        if (c) {
            c.on({
                columnsort: "onColumnSort",
                columnresize: "onColumnResize",
                columnshow: "onColumnShow",
                columnhide: "onColumnHide",
                columnadd: "onColumnAdd",
                columnremove: "onColumnRemove",
                scope: b
            })
        }
    },
    addColumn: function(a) {
        this.getHeaderContainer().add(a)
    },
    removeColumn: function(a) {
        this.getHeaderContainer().remove(a)
    },
    insertColumn: function(a, b) {
        this.getHeaderContainer().insert(a, b)
    },
    onColumnAdd: function(a, e) {
        if (this.isPainted()) {
            var b = this.listItems,
            f = b.length,
            d = a.getColumns().indexOf(e),
            c,
            g;
            for (c = 0; c < f; c++) {
                g = b[c];
                g.insertColumn(d, e)
            }
            this.updateTotalColumnWidth();
            this.fireEvent("columnadd", this, e, d)
        }
    },
    onColumnRemove: function(a, d) {
        if (this.isPainted()) {
            var b = this.listItems,
            e = b.length,
            c, f;
            for (c = 0; c < e; c++) {
                f = b[c];
                f.removeColumn(d)
            }
            this.updateTotalColumnWidth();
            this.fireEvent("columnremove", this, d)
        }
    },
    updateColumns: function(b) {
        if (b && b.length) {
            var c = b.length,
            a;
            for (a = 0; a < c; a++) {
                this.addColumn(b[a])
            }
            this.updateTotalColumnWidth()
        }
    },
    getColumns: function() {
        return this.getHeaderContainer().getColumns()
    },
    onColumnResize: function(a, e, d) {
        var b = this.listItems,
        f = b.length,
        c, g;
        for (c = 0; c < f; c++) {
            g = b[c];
            g.setColumnWidth(e, d)
        }
        this.updateTotalColumnWidth();
        this.fireEvent("columnresize", e, d)
    },
    onColumnShow: function(a, d) {
        var b = this.listItems,
        e = b.length,
        c, f;
        this.updateTotalColumnWidth();
        for (c = 0; c < e; c++) {
            f = b[c];
            f.showColumn(d)
        }
        this.fireEvent("columnshow", this, d)
    },
    onColumnHide: function(a, d) {
        var b = this.listItems,
        e = b.length,
        c, f;
        for (c = 0; c < e; c++) {
            f = b[c];
            f.hideColumn(d)
        }
        this.updateTotalColumnWidth();
        this.fireEvent("columnhide", this, d)
    },
    onColumnSort: function(a, b, c) {
        if (this.sortedColumn && this.sortedColumn !== b) {
            this.sortedColumn.setSortDirection(null)
        }
        this.sortedColumn = b;
        this.getStore().sort(b.getDataIndex(), c);
        this.fireEvent("columnsort", this, b, c)
    },
    getTotalColumnWidth: function() {
        var g = this,
        c = g.getColumns(),
        f = c.length,
        a = 0,
        b,
        e,
        d;
        for (b = 0; b < f; b++) {
            e = c[b];
            d = e.getParent();
            if (!e.isHidden() && (!d.isHeaderGroup || !d.isHidden())) {
                a += e.getWidth()
            }
        }
        return a
    },
    updateTotalColumnWidth: function() {
        var c = this,
        b = c.getScrollable().getScroller(),
        a = this.getTotalColumnWidth();
        c.scrollElement.setWidth(a);
        b.setSize({
            x: a,
            y: b.getSize().y
        });
        b.refresh()
    },
    setScrollerHeight: function(b) {
        var c = this,
        a = c.container.getScrollable().getScroller();
        if (b != a.givenSize.y) {
            a.setSize({
                x: a.givenSize.x,
                y: b
            });
            a.refresh()
        }
    },
    createItem: function(b) {
        var d = this,
        a = d.container,
        e = d.listItems,
        c;
        b.grid = d;
        c = Ext.factory(b);
        c.dataview = d;
        c.$height = b.minHeight;
        a.doAdd(c);
        e.push(c);
        return c
    }
});
Ext.define("Ext.grid.column.Boolean", {
    extend: 'Ext.grid.column.Column',
    xtype: "booleancolumn",
    config: {
        trueText: "True",
        falseText: "False",
        undefinedText: "&#160;",
        defaultEditor: {
            xtype: "checkboxfield"
        }
    },
    defaultRenderer: function(a) {
        if (a === undefined) {
            return this.getUndefinedText()
        }
        if (!a || a === "false") {
            return this.getFalseText()
        }
        return this.getTrueText()
    }
});
Ext.define("Ext.grid.column.Number", {
    extend: 'Ext.grid.column.Column',
    xtype: "numbercolumn",
    config: {
        format: "0,000.00",
        defaultEditor: {
            xtype: "numberfield"
        }
    },
    defaultRenderer: function(a) {
        return Ext.util.Format.number(a, this.getFormat())
    }
});
Ext.define("Ext.grid.column.Action", {
    extend: 'Ext.grid.column.Column',
    alias: ["widget.actioncolumn"],
    alternateClassName: "Ext.grid.ActionColumn",
    actionIdRe: new RegExp(Ext.baseCSSPrefix + "action-col-(\\d+)"),
    altText: "",
    menuText: "<i>Actions</i>",
    sortable: false,
    constructor: function(d) {
        var f = this,
        b = Ext.apply({},
        d),
        c = b.items || f.items || [f],
        g,
        e,
        a;
        f.origRenderer = b.renderer || f.renderer;
        f.origScope = b.scope || f.scope;
        f.renderer = f.scope = b.renderer = b.scope = null;
        b.items = null;
        f.callParent([b]);
        f.items = c;
        for (e = 0, a = c.length; e < a; ++e) {
            if (c[e].getClass) {
                g = true;
                break
            }
        }
        if (f.origRenderer || g) {
            f.hasCustomRenderer = true
        }
    },
    defaultRenderer: function(n, q, e, a, d, m, l) {
        var k = this,
        f = Ext.baseCSSPrefix,
        p = k.origScope || k,
        j = k.items,
        g = j.length,
        c = 0,
        o, h, b, r;
        h = Ext.isFunction(k.origRenderer) ? k.origRenderer.apply(p, arguments) || "": "";
        q.tdCls += " " + Ext.baseCSSPrefix + "action-col-cell";
        for (; c < g; c++) {
            o = j[c];
            b = o.disabled || (o.isDisabled ? o.isDisabled.call(o.scope || p, l, a, d, o, e) : false);
            r = b ? null: (o.tooltip || (o.getTip ? o.getTip.apply(o.scope || p, arguments) : null));
            if (!o.hasActionConfiguration) {
                o.stopSelection = k.stopSelection;
                o.disable = Ext.Function.bind(k.disableAction, k, [c], 0);
                o.enable = Ext.Function.bind(k.enableAction, k, [c], 0);
                o.hasActionConfiguration = true
            }
            h += '<img alt="' + (o.altText || k.altText) + '" src="' + (o.icon || Ext.BLANK_IMAGE_URL) + '" class="' + f + "action-col-icon " + f + "action-col-" + String(c) + " " + (b ? f + "item-disabled": " ") + " " + (Ext.isFunction(o.getClass) ? o.getClass.apply(o.scope || p, arguments) : (o.iconCls || k.iconCls || "")) + '"' + (r ? ' data-qtip="' + r + '"': "") + " />"
        }
        return h
    },
    enableAction: function(b, a) {
        var c = this;
        if (!b) {
            b = 0
        } else {
            if (!Ext.isNumber(b)) {
                b = Ext.Array.indexOf(c.items, b)
            }
        }
        c.items[b].disabled = false;
        c.up("tablepanel").el.select("." + Ext.baseCSSPrefix + "action-col-" + b).removeCls(c.disabledCls);
        if (!a) {
            c.fireEvent("enable", c)
        }
    },
    disableAction: function(b, a) {
        var c = this;
        if (!b) {
            b = 0
        } else {
            if (!Ext.isNumber(b)) {
                b = Ext.Array.indexOf(c.items, b)
            }
        }
        c.items[b].disabled = true;
        c.up("tablepanel").el.select("." + Ext.baseCSSPrefix + "action-col-" + b).addCls(c.disabledCls);
        if (!a) {
            c.fireEvent("disable", c)
        }
    },
    destroy: function() {
        delete this.items;
        delete this.renderer;
        return this.callParent(arguments)
    },
    processEvent: function(i, l, n, b, j, g, d, p) {
        var h = this,
        f = g.getTarget(),
        c,
        o,
        k,
        m = i == "keydown" && g.getKey(),
        a;
        if (m && !Ext.fly(f).findParent(l.getCellSelector())) {
            f = Ext.fly(n).down("." + Ext.baseCSSPrefix + "action-col-icon", true)
        }
        if (f && (c = f.className.match(h.actionIdRe))) {
            o = h.items[parseInt(c[1], 10)];
            a = o.disabled || (o.isDisabled ? o.isDisabled.call(o.scope || h.origScope || h, l, b, j, o, d) : false);
            if (o && !a) {
                if (i == "click" || (m == g.ENTER || m == g.SPACE)) {
                    k = o.handler || h.handler;
                    if (k) {
                        k.call(o.scope || h.origScope || h, l, b, j, o, g, d, p)
                    }
                } else {
                    if (i == "mousedown" && o.stopSelection !== false) {
                        return false
                    }
                }
            }
        }
        return h.callParent(arguments)
    },
    cascade: function(b, a) {
        b.call(a || this, this)
    },
    getRefItems: function() {
        return []
    }
});
Ext.define("Ext.grid.column.CheckColumn", {
    extend: Ext.grid.column.Column,
    alternateClassName: "Ext.ux.CheckColumn",
    alias: "widget.checkcolumn",
    align: "center",
    stopSelection: true,
    tdCls: Ext.baseCSSPrefix + "grid-cell-checkcolumn",
    constructor: function() {
        this.addEvents("beforecheckchange", "checkchange");
        this.scope = this;
        this.callParent(arguments)
    },
    processEvent: function(g, i, m, b, h, d, c, n) {
        var f = this,
        l = g === "keydown" && d.getKey(),
        a = g == "mousedown";
        if (!f.disabled && (a || (l == d.ENTER || l == d.SPACE))) {
            var j = f.dataIndex,
            k = !c.get(j);
            if (f.fireEvent("beforecheckchange", f, b, k) !== false) {
                c.set(j, k);
                f.fireEvent("checkchange", f, b, k);
                if (a) {
                    d.stopEvent()
                }
                if (!f.stopSelection) {
                    i.selModel.selectByPosition({
                        row: b,
                        column: h
                    })
                }
                return false
            } else {
                return ! f.stopSelection
            }
        } else {
            return f.callParent(arguments)
        }
    },
    onEnable: function(a) {
        var b = this;
        b.callParent(arguments);
        b.up("tablepanel").el.select("." + Ext.baseCSSPrefix + "grid-cell-" + b.id).removeCls(b.disabledCls);
        if (!a) {
            b.fireEvent("enable", b)
        }
    },
    onDisable: function(a) {
        var b = this;
        b.callParent(arguments);
        b.up("tablepanel").el.select("." + Ext.baseCSSPrefix + "grid-cell-" + b.id).addCls(b.disabledCls);
        if (!a) {
            b.fireEvent("disable", b)
        }
    },
    renderer: function(b, c) {
        var d = Ext.baseCSSPrefix,
        a = [d + "grid-checkcolumn"];
        if (this.disabled) {
            c.tdCls += " " + this.disabledCls
        }
        if (b) {
            a.push(d + "grid-checkcolumn-checked")
        }
        return '<img class="' + a.join(" ") + '" src="' + Ext.BLANK_IMAGE_URL + '"/>'
    }
});
Ext.define("Ext.grid.infinite.TemplateRow", {
    extend: 'Ext.Component',
    xtype: "listgridrow",
    config: {
        baseCls: Ext.baseCSSPrefix + "listgrid-row",
        columns: null
    },
    constructor: function() {
        this.callParent(arguments)
    },
    updateColumns: function(c) {
        var f = this,
        d = f.element,
        j = f.cells,
        h = j.length,
        b = c.length,
        a = b - h,
        e, g;
        for (e = 0; e < a; e++) {
            g = f.createCell(h + e);
            d.appendChild(g);
            j.push(g)
        }
        for (e = a; e < 0; e++) {
            d.removeChild(j.pop())
        }
        for (e = 0; e < b; e++) {
            j[e].style.width = (c[e].getWidth()) + "px"
        }
    }
});
Ext.define("Ext.grid.plugin.ColumnResizing", {
    extend: 'Ext.Component',
    alias: "plugin.gridcolumnresizing",
    config: {
        grid: null
    },
    init: function(a) {
        this.setGrid(a)
    },
    updateGrid: function(a, b) {
        if (b) {
            b.getHeaderContainer().renderElement.un({
                pinchstart: "onContainerPinchStart",
                pinch: "onContainerPinch",
                pinchend: "onContainerPinchEnd",
                scope: this
            })
        }
        if (a) {
            a.getHeaderContainer().renderElement.on({
                pinchstart: "onContainerPinchStart",
                pinch: "onContainerPinch",
                pinchend: "onContainerPinchEnd",
                scope: this
            })
        }
    },
    onContainerPinchStart: function(c) {
        var b = c.getTarget("." + Ext.baseCSSPrefix + "grid-column"),
        a;
        if (b) {
            a = Ext.getCmp(b.id);
            if (a && a.getResizable()) {
                this.startColumnWidth = a.getWidth();
                this.resizeColumn = a;
                this.startDistance = c.distance;
                a.renderElement.addCls(Ext.baseCSSPrefix + "grid-column-resizing")
            } else {
                c.preventDefault()
            }
        }
    },
    onContainerPinch: function(c) {
        var b = this.resizeColumn,
        a = c.distance - this.startDistance;
        if (b) {
            this.currentColumnWidth = Math.ceil(this.startColumnWidth + a);
            b.renderElement.setWidth(this.currentColumnWidth)
        }
    },
    onContainerPinchEnd: function() {
        var a = this.resizeColumn;
        if (a) {
            a.setWidth(this.currentColumnWidth + 1);
            a.renderElement.removeCls(Ext.baseCSSPrefix + "grid-column-resizing");
            delete this.resizeColumn
        }
    }
});
Ext.define("Ext.grid.plugin.Editable", {
    extend: 'Ext.Component',
    alias: "plugin.grideditable",
    config: {
        grid: null,
        triggerEvent: "doubletap",
        formConfig: null,
        defaultFormConfig: {
            xtype: "formpanel",
            modal: true,
            scrollable: true,
            items: {
                xtype: "fieldset"
            }
        },
        toolbarConfig: {
            xtype: "titlebar",
            docked: "top",
            items: [{
                xtype: "button",
                ui: "decline",
                text: "Cancel",
                align: "left",
                action: "cancel"
            },
            {
                xtype: "button",
                ui: "confirm",
                text: "Submit",
                align: "right",
                action: "submit"
            }]
        },
        enableDeleteButton: true
    },
    init: function(a) {
        this.setGrid(a)
    },
    updateGrid: function(a, b) {
        var c = this.getTriggerEvent();
        if (b) {
            b.renderElement.un(c, "onTrigger", this)
        }
        if (a) {
            a.renderElement.on(c, "onTrigger", this)
        }
    },
    onCancelTap: function() {
        this.sheet.hide()
    },
    onSubmitTap: function() {
        this.form.getRecord().set(this.form.getValues());
        this.sheet.hide()
    },
    onSheetHide: function() {
        this.sheet.destroy();
        this.form = null;
        this.sheet = null
    },
    getRecordByTriggerEvent: function(b) {
        var a = b.getTarget("." + Ext.baseCSSPrefix + "grid-row"),
        c;
        if (a) {
            c = Ext.getCmp(a.id);
            if (c) {
                return c.getRecord()
            }
        }
        return null
    },
    getEditorFields: function(c) {
        var a = [],
        f = c.length,
        b,
        e,
        d;
        for (b = 0; b < f; b++) {
            e = c[b];
            if (e.getEditable()) {
                d = Ext.apply({},
                e.getEditor() || e.getDefaultEditor());
                d.label = e.getText();
                a.push(d)
            }
        }
        return a
    },
    onTrigger: function(g) {
        var i = this,
        a = i.getGrid(),
        k = i.getFormConfig(),
        c = i.getToolbarConfig(),
        d = i.getRecordByTriggerEvent(g),
        f,
        b,
        h,
        j;
        if (d) {
            if (k) {
                this.form = b = Ext.factory(k, Ext.form.Panel)
            } else {
                this.form = b = Ext.factory(i.getDefaultFormConfig());
                f = i.getEditorFields(a.getColumns());
                b.down("fieldset").setItems(f)
            }
            b.setRecord(d);
            j = Ext.factory(c, Ext.form.TitleBar);
            j.down("button[action=cancel]").on("tap", "onCancelTap", this);
            j.down("button[action=submit]").on("tap", "onSubmitTap", this);
            this.sheet = h = a.add({
                xtype: "sheet",
                items: [j, b],
                hideOnMaskTap: true,
                enter: "right",
                exit: "right",
                right: 0,
                width: 320,
                layout: "fit",
                stretchY: true,
                hidden: true
            });
            if (i.getEnableDeleteButton()) {
                b.add({
                    xtype: "button",
                    text: "Delete",
                    ui: "decline",
                    margin: 10,
                    handler: function() {
                        a.getStore().remove(d);
                        h.hide()
                    }
                })
            }
            h.on("hide", "onSheetHide", this);
            h.show()
        }
    }
});
Ext.define("Ext.grid.plugin.MultiSelection", {
    extend: 'Ext.Component',
    alias: "plugin.gridmultiselection",
    config: {
        grid: null,
        selectionColumn: {
            width: 60,
            xtype: "column",
            cls: Ext.baseCSSPrefix + "grid-multiselection-column",
            cellCls: Ext.baseCSSPrefix + "grid-multiselection-cell",
            ignore: true,
            hidden: true
        },
        useTriggerButton: true,
        triggerText: "Select",
        cancelText: "Cancel",
        deleteText: "Delete"
    },
    init: function(b) {
        this.setGrid(b);
        var a = b.getTitleBar();
        if (this.getUseTriggerButton() && a) {
            this.triggerButton = a.add({
                align: "right",
                xtype: "button",
                text: this.getTriggerText()
            });
            this.triggerButton.on({
                tap: "onTriggerButtonTap",
                scope: this
            })
        }
        b.getHeaderContainer().on({
            columntap: "onColumnTap",
            scope: this
        })
    },
    onTriggerButtonTap: function() {
        if (this.getSelectionColumn().isHidden()) {
            this.enterSelectionMode()
        } else {
            this.deleteSelectedRecords();
            this.getGrid().deselectAll()
        }
    },
    onColumnTap: function(a, c) {
        var b = this.getGrid();
        if (c === this.getSelectionColumn()) {
            if (b.getSelectionCount() === b.getStore().getCount()) {
                b.deselectAll()
            } else {
                b.selectAll()
            }
        }
    },
    enterSelectionMode: function() {
        this.triggerButton.setText(this.getDeleteText());
        this.triggerButton.setUi("decline");
        this.cancelButton = this.getGrid().getTitleBar().add({
            align: "right",
            xtype: "button",
            ui: "action",
            text: this.getCancelText(),
            scope: this
        });
        this.cancelButton.on({
            tap: "exitSelectionMode",
            scope: this
        });
        this.getSelectionColumn().show();
        this.getGrid().setMode("MULTI")
    },
    exitSelectionMode: function() {
        this.cancelButton.destroy();
        this.triggerButton.setText(this.getTriggerText());
        this.triggerButton.setUi(null);
        this.getSelectionColumn().hide();
        this.getGrid().setMode("SINGLE");
        this.getGrid().deselectAll()
    },
    deleteSelectedRecords: function() {
        this.getGrid().getStore().remove(this.getGrid().getSelection())
    },
    applySelectionColumn: function(a) {
        if (a && !a.isComponent) {
            a = Ext.factory(a, Ext.grid.Column)
        }
        return a
    },
    updateSelectionColumn: function(c, b) {
        var a = this.getGrid();
        if (a) {
            if (b) {
                a.removeColumn(b)
            }
            if (c) {
                a.insertColumn(0, c)
            }
        }
    },
    onGridSelectionChange: function() {
        var a = this.getGrid(),
        b = this.getSelectionColumn();
        if (a.getSelectionCount() === a.getStore().getCount()) {
            b.addCls(Ext.baseCSSPrefix + "grid-multiselection-allselected")
        } else {
            b.removeCls(Ext.baseCSSPrefix + "grid-multiselection-allselected")
        }
    },
    updateGrid: function(a, b) {
        var c = "." + Ext.baseCSSPrefix + "grid-multiselectioncell";
        if (b) {
            b.removeColumn(this.getSelectionColumn());
            b.container.renderElement.un({
                tap: "onGridTap",
                delegate: c,
                scope: this
            });
            b.un({
                selectionchange: "onGridSelectionChange",
                scope: this
            })
        }
        if (a) {
            a.insertColumn(0, this.getSelectionColumn());
            a.container.renderElement.on({
                tap: "onGridTap",
                delegate: c,
                scope: this
            });
            a.on({
                selectionchange: "onGridSelectionChange",
                scope: this
            })
        }
    }
});
Ext.define("Ext.grid.plugin.PagingToolbar", {
    extend: 'Ext.Component',
    alias: "plugin.gridpagingtoolbar",
    mixins: ['Ext.mixin.Bindable'],
    config: {
        grid: null,
        currentPage: 1,
        totalPages: 0,
        pageSize: 0,
        totalCount: 0,
        toolbar: {
            xtype: "toolbar",
            docked: "bottom",
            ui: "gray",
            cls: Ext.baseCSSPrefix + "grid-pagingtoolbar",
            items: [{
                xtype: "button",
                ui: "plain",
                iconCls: "arrow_left",
                action: "previouspage",
                left: 0,
                top: 5
            },
            {
                xtype: "component",
                role: "currentpage",
                width: 20,
                cls: Ext.baseCSSPrefix + "grid-pagingtoolbar-currentpage"
            },
            {
                xtype: "component",
                role: "totalpages",
                width: 50,
                tpl: "&nbsp;/ {totalPages}"
            },
            {
                xtype: "sliderfield",
                value: 1,
                flex: 1,
                minValue: 1,
                role: "pageslider"
            },
            {
                xtype: "button",
                ui: "plain",
                iconCls: "arrow_right",
                action: "nextpage",
                right: 0,
                top: 5
            }]
        }
    },
    init: function(a) {
        this.setGrid(a);
        a.container.add(this.getToolbar());
        if (a.getStore().getCount()) {
            this.updateCurrentPage(this.getCurrentPage())
        }
    },
    updateGrid: function(a, b) {
        if (b) {
            b.un({
                updatevisiblecount: "onUpdateVisibleCount",
                scope: this
            });
            b.getStore().un({
                addrecords: "onTotalCountChange",
                removerecords: "onTotalCountChange",
                refresh: "onTotalCountChange",
                scope: this
            })
        }
        if (a) {
            a.on({
                updatevisiblecount: "onUpdateVisibleCount",
                scope: this
            });
            a.getStore().on({
                addrecords: "onTotalCountChange",
                removerecords: "onTotalCountChange",
                refresh: "onTotalCountChange",
                scope: this
            });
            this.bind(a, "onScrollBinder", "checkPageChange")
        }
    },
    checkPageChange: function() {
        var c = this.getGrid(),
        b = this.getPageSize(),
        e = this.getCurrentPage(),
        a = this.getTotalCount(),
        f = c.topVisibleIndex,
        d = Math.floor(c.topVisibleIndex / b) + 1;
        if (f + b >= a) {
            d++
        }
        if (f && d !== e) {
            this.preventGridScroll = true;
            this.setCurrentPage(d);
            this.preventGridScroll = false
        }
    },
    applyToolbar: function(a) {
        if (a && !a.isComponent) {
            a = Ext.factory(a, Ext.Toolbar)
        }
        return a
    },
    updateToolbar: function(a) {
        if (a) {
            this.currentPage = a.down("component[role=currentpage]");
            this.totalPages = a.down("component[role=totalpages]");
            this.pageSlider = a.down("sliderfield[role=pageslider]");
            this.nextPageButton = a.down("button[action=nextpage]");
            this.previousPageButton = a.down("button[action=previouspage]");
            this.pageSlider.on({
                change: "onPageChange",
                drag: "onPageSliderDrag",
                scope: this
            });
            this.nextPageButton.on({
                tap: "onNextPageTap",
                scope: this
            });
            this.previousPageButton.on({
                tap: "onPreviousPageTap",
                scope: this
            });
            this.currentPage.element.createChild({
                tag: "span"
            })
        }
    },
    onPageChange: function(d, b, a, c) {
        if (c !== this.getCurrentPage()) {
            this.setCurrentPage(c)
        }
    },
    onPageSliderDrag: function(d, b, a, c) {
        if (c[0] !== this.getCurrentPage()) {
            this.setCurrentPage(c[0])
        }
    },
    onNextPageTap: function() {
        var a = this.getCurrentPage() + 1;
        if (a <= this.getTotalPages()) {
            this.setCurrentPage(a)
        }
    },
    onPreviousPageTap: function() {
        var a = this.getCurrentPage() - 1;
        if (a > 0) {
            this.setCurrentPage(a)
        }
    },
    onTotalCountChange: function(a) {
        this.setTotalCount(a.getCount())
    },
    onUpdateVisibleCount: function(d, c) {
        c -= 1;
        var b = d.getStore(),
        a = b.getCount(),
        e = Math.ceil(a / c);
        this.setTotalPages(e);
        this.setPageSize(c)
    },
    updateTotalPages: function(a) {
        this.getToolbar();
        this.totalPages.setData({
            totalPages: a
        });
        this.pageSlider.setMaxValue(a || 1);
        this.updateCurrentPage(this.getCurrentPage())
    },
    updateCurrentPage: function(c) {
        var b = this.getGrid(),
        a;
        this.getToolbar();
        this.currentPage.element.dom.firstChild.innerHTML = c;
        if (this.pageSlider.getValue() !== c) {
            this.pageSlider.setValue(c)
        }
        a = this.getPageTopRecord(c);
        if (b && !this.preventGridScroll && a) {
            b.scrollToRecord(a)
        }
        this.updatePageButtons()
    },
    updateTotalCount: function(a) {
        var b;
        if (a !== null && a !== undefined) {
            if (a === 0) {
                b = 1
            } else {
                b = Math.ceil(a / this.getPageSize())
            }
            this.setTotalPages(b)
        }
    },
    updatePageButtons: function() {
        var a = this.getCurrentPage();
        this.previousPageButton.enable();
        this.nextPageButton.enable();
        if (a == this.getTotalPages()) {
            this.nextPageButton.disable()
        }
        if (a == 1) {
            this.previousPageButton.disable()
        }
    },
    getPageTopRecord: function(f) {
        var d = this.getGrid(),
        c = d && d.getStore(),
        b = this.getPageSize(),
        e = (f - 1) * b,
        a = c && c.getAt(e);
        return a
    }
});
Ext.define("Ext.grid.plugin.SummaryRow", {
    extend: 'Ext.grid.Row',
    alias: "plugin.gridsummaryrow",
    mixins: ['Ext.mixin.Bindable'],
    config: {
        grid: null,
        cls: Ext.baseCSSPrefix + "grid-summaryrow",
        emptyText: "",
        emptyCls: Ext.baseCSSPrefix + "grid-summaryrow-empty",
        docked: "top",
        height: 32,
        translatable: {
            translationMethod: "csstransform"
        }
    },
    init: function(a) {
        this.setGrid(a)
    },
    updateGrid: function(c) {
        if (c) {
            var b = c.getColumns(),
            e = b.length,
            d = c.getHeaderContainer(),
            a;
            c.getStore().onAfter({
                addrecords: "doUpdateSummary",
                removerecords: "doUpdateSummary",
                updaterecord: "doUpdateSummary",
                refresh: "doUpdateSummary",
                scope: this
            });
            c.getHeaderContainer().on({
                columnadd: "onColumnAdd",
                columnremove: "onColumnRemove",
                columnshow: "onColumnShow",
                columnhide: "onColumnHide",
                columnresize: "onColumnResize",
                scope: this
            });
            if (c.initialized) {
                c.container.insertAfter(this, c.getHeaderContainer())
            } else {
                c.on("initialize",
                function() {
                    c.container.insertAfter(this, c.getHeaderContainer())
                },
                this, {
                    single: true
                })
            }
            c.addCls(Ext.baseCSSPrefix + "grid-hassummaryrow");
            for (a = 0; a < e; a++) {
                this.onColumnAdd(d, b[a])
            }
            this.bind(c, "onScrollBinder", "onGridScroll")
        }
    },
    onGridScroll: function(a) {
        if (this.currentX !== a) {
            this.translate(a);
            this.currentX = a
        }
    },
    onColumnAdd: function(a, b) {
        this.insertColumn(a.getColumns().indexOf(b), b);
        this.updateRowWidth()
    },
    onColumnRemove: function(a, b) {
        this.removeColumn(b);
        this.updateRowWidth()
    },
    onColumnShow: function(a, b) {
        this.showColumn(b);
        this.updateRowWidth()
    },
    onColumnHide: function(a, b) {
        this.hideColumn(b);
        this.updateRowWidth()
    },
    onColumnResize: function(a, c, b) {
        this.setColumnWidth(c, b);
        this.updateRowWidth()
    },
    updateRowWidth: function() {
        this.setWidth(this.getGrid().getTotalColumnWidth())
    },
    doUpdateSummary: function() {
        var a = this.getGrid(),
        n = a.getStore(),
        e = a.getColumns(),
        h = e.length,
        c = this.getEmptyText(),
        k = this.getEmptyCls(),
        f,
        d,
        j,
        g,
        o,
        m,
        l,
        b;
        for (f = 0; f < h; f++) {
            d = e[f];
            j = d.getSummaryType();
            o = this.getCellByColumn(d);
            b = Ext.get(o);
            if (!d.getIgnore() && j !== null) {
                l = d.getDataIndex();
                g = d.getSummaryRenderer();
                if (Ext.isFunction(j)) {
                    m = j.call(n, n.data.items.slice(), l)
                } else {
                    switch (j) {
                    case "sum":
                    case "average":
                    case "min":
                    case "max":
                        m = n[j](d.getDataIndex());
                        break;
                    case "count":
                        m = n.getCount();
                        break
                    }
                }
                if (g !== null) {
                    m = g.call(n, m)
                }
                b.removeCls(k);
                d.updateCell(o, null, m)
            } else {
                b.addCls(k);
                d.updateCell(o, null, c)
            }
        }
    }
});
Ext.define("Ext.grid.plugin.ViewOptions", {
    extend: 'Ext.Component',
    alias: "plugin.gridviewoptions",
    config: {
        grid: null,
        sheetWidth: 320,
        sheet: {
            baseCls: Ext.baseCSSPrefix + "grid-viewoptions",
            xtype: "sheet",
            items: [{
                docked: "top",
                xtype: "titlebar",
                title: "Customize",
                items: {
                    xtype: "button",
                    text: "Done",
                    ui: "action",
                    align: "right",
                    role: "donebutton"
                }
            }],
            hideOnMaskTap: false,
            enter: "right",
            exit: "right",
            modal: false,
            translatable: {
                translationMethod: "csstransform"
            },
            right: 0,
            layout: "fit",
            stretchY: true
        },
        columnList: {
            xtype: "nestedlist",
            title: "Column",
            listConfig: {
                plugins: [{
                    type: "sortablelist",
                    handleSelector: ".x-column-options-sortablehandle"
                }],
                mode: "MULTI",
                infinite: true,
                itemTpl: ['<div class="x-column-options-sortablehandle"></div>', '<tpl if="header">', '<div class="x-column-options-folder"></div>', "<tpl else>", '<div class="x-column-options-leaf"></div>', "</tpl>", '<div class="x-column-options-text">{text}</div>', '<div class="x-column-options-visibleindicator"></div>'],
                triggerEvent: null,
                bufferSize: 1,
                minimumBufferSize: 1
            },
            store: {
                type: "tree",
                fields: ["id", "text", "header"],
                root: {
                    text: "Columns"
                }
            },
            clearSelectionOnListChange: false
        },
        visibleIndicatorSelector: ".x-column-options-visibleindicator"
    },
    sheetVisible: false,
    init: function(a) {
        this.setGrid(a);
        a.add(this.getSheet());
        this.getSheet().translate(this.getSheetWidth());
        this.getSheet().down("button[role=donebutton]").on({
            tap: "onDoneButtonTap",
            scope: this
        })
    },
    updateGrid: function(a, b) {
        if (b) {
            b.getHeaderContainer().renderElement.un({
                dragstart: "onDragStart",
                drag: "onDrag",
                dragend: "onDragEnd",
                scope: this
            });
            b.getHeaderContainer().un({
                columnadd: "onColumnAdd",
                columnremove: "onColumnRemove",
                scope: this
            })
        }
        if (a) {
            a.getHeaderContainer().renderElement.on({
                dragstart: "onDragStart",
                drag: "onDrag",
                dragend: "onDragEnd",
                scope: this
            });
            a.getHeaderContainer().on({
                columnadd: "onColumnAdd",
                columnremove: "onColumnRemove",
                columnhide: "onColumnHide",
                columnshow: "onColumnShow",
                scope: this
            })
        }
    },
    applySheet: function(a) {
        if (a && !a.isComponent) {
            a = Ext.factory(a, Ext.Sheet)
        }
        return a
    },
    applyColumnList: function(a) {
        if (a && !a.isComponent) {
            a = Ext.factory(a, Ext.Container)
        }
        return a
    },
    updateColumnList: function(a) {
        if (a) {
            a.on({
                listchange: "onListChange",
                scope: this
            });
            a.on({
                selectionchange: "onColumnToggle",
                dragsort: "onColumnReorder",
                delegate: "> list",
                scope: this
            });
            this.attachTapListeners()
        }
    },
    updateSheet: function(b) {
        var a = this.getSheetWidth();
        b.setWidth(a);
        b.translate(a);
        b.add(this.getColumnList())
    },
    onDoneButtonTap: function() {
        this.hideViewOptions()
    },
    onColumnReorder: function(c, j, h) {
        var a = Ext.getCmp(j.getRecord().get("id")),
        f = a.getParent(),
        e = f.getInnerItems(),
        b,
        d,
        g;
        for (b = 0, d = h; b < d; b++) {
            g = e[b];
            if (!g.isHeaderGroup && g.getIgnore()) {
                h += 1
            }
        }
        this.isMoving = true;
        f.remove(a, false);
        f.insert(h, a);
        this.isMoving = false
    },
    attachTapListeners: function() {
        var a = this.getColumnList().getActiveItem();
        if (!a.hasAttachedTapListeners) {
            a.onBefore({
                itemtap: "onListItemTap",
                scope: this
            });
            a.hasAttachedTapListeners = true
        }
    },
    onListChange: function(c, f) {
        var j = f.getStore(),
        h = j.getNode(),
        a = h.childNodes,
        g = a.length,
        d,
        b,
        e;
        for (d = 0; d < g; d++) {
            e = a[d];
            b = Ext.getCmp(e.getId());
            if (b.isHidden() && f.isSelected(e)) {
                f.deselect(e, true, true)
            } else {
                if (!b.isHidden() && !f.isSelected(e)) {
                    f.select(e, true, true)
                }
            }
        }
        this.attachTapListeners()
    },
    onListItemTap: function(c, b, f, a, d) {
        if (Ext.DomQuery.is(d.target, this.getVisibleIndicatorSelector())) {
            this.onVisibleIndicatorTap(f, a, b);
            return false
        }
    },
    onVisibleIndicatorTap: function(b, a) {
        var c = this.getColumnList().getActiveItem();
        if (c.isSelected(a)) {
            c.deselect(a)
        } else {
            c.select(a, true)
        }
    },
    onColumnToggle: function(c, d) {
        var b = d[0],
        a = Ext.getCmp(b.get("id"));
        if (c.isSelected(b)) {
            a.show()
        } else {
            a.hide()
        }
    },
    onColumnHide: function(d, c) {
        var e = this.getColumnList(),
        f = e.getActiveItem(),
        b = f.getStore(),
        a = b.getById(c.getId());
        if (a && f.isSelected(a)) {
            f.deselect(a, true, true)
        }
    },
    onColumnShow: function(d, c) {
        var e = this.getColumnList(),
        f = e.getActiveItem(),
        b = f.getStore(),
        a = b.getById(c.getId());
        if (a && !f.isSelected(a)) {
            f.select(a, true, true)
        }
    },
    onColumnAdd: function(b, c, g) {
        if (c.getIgnore() || this.isMoving) {
            return
        }
        var d = this.getColumnList(),
        a = d.getActiveItem(),
        i = d.getStore(),
        h = i.getRoot(),
        e = {
            id: c.getId(),
            text: c.getText(),
            leaf: true
        },
        f;
        if (g) {
            if (g.innerIndexOf(c) === 0) {
                h = h.appendChild({
                    header: true,
                    id: g.getId(),
                    text: g.getText()
                });
                if (!g.isHidden()) {
                    a.select(h, true, true)
                }
            } else {
                h = h.findChild("id", g.getId())
            }
            h.appendChild(e)
        } else {
            f = h.appendChild(e);
            if (!c.isHidden()) {
                a.select(f, true, true)
            }
        }
    },
    onColumnRemove: function(d, c) {
        if (c.getIgnore() || this.isMoving) {
            return
        }
        var b = this.getColumnList().getStore().getRoot(),
        a = b.findChild("id", c.getId(), true);
        if (a) {
            a.parentNode.removeChild(a, true)
        }
    },
    onDragStart: function() {
        var a = this.getSheetWidth(),
        b = this.getSheet();
        if (!this.sheetVisible) {
            b.translate(a);
            this.startTranslate = a
        } else {
            b.translate(0);
            this.startTranslate = 0
        }
    },
    onDrag: function(a) {
        this.getSheet().translate(Math.max(this.startTranslate + a.deltaX, 0))
    },
    onDragEnd: function(b) {
        var a = this;
        if (b.flick.velocity.x > 0.1) {
            a.hideViewOptions()
        } else {
            a.showViewOptions()
        }
    },
    hideViewOptions: function() {
        var a = this.getSheet();
        a.translate(this.getSheetWidth(), 0, {
            duration: 100
        });
        a.getTranslatable().on("animationend",
        function() {
            if (a.getModal()) {
                a.getModal().destroy();
                a.setModal(null)
            }
        },
        this, {
            single: true
        });
        this.sheetVisible = false
    },
    showViewOptions: function() {
        if (!this.sheetVisible) {
            var a = this.getSheet(),
            b = null;
            a.translate(0, 0, {
                duration: 100
            });
            a.getTranslatable().on("animationend",
            function() {
                a.setModal(true);
                b = a.getModal();
                b.element.onBefore({
                    tap: "hideViewOptions",
                    dragstart: "onDragStart",
                    drag: "onDrag",
                    dragend: "onDragEnd",
                    scope: this
                })
            },
            this, {
                single: true
            });
            this.sheetVisible = true
        }
    }
});