/**
 * @class Ext.grid.GridView
 * @override Ext.grid.GridView GridPanel单元格不能选中复制问题 单元格数据显示不完整 ,增加title 浮动提示信息
 */
Ext.override(Ext.grid.GridView, {
			initTemplates : function() {
				var ts = this.templates || {};
				if (!ts.master) {
					ts.master = new Ext.Template('<div class="x-grid3" hidefocus="true">', '<div class="x-grid3-viewport">',
							'<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
							'<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>', '</div>', '<div class="x-grid3-resize-marker">&#160;</div>',
							'<div class="x-grid3-resize-proxy">&#160;</div>', '</div>');
				}

				if (!ts.header) {
					ts.header = new Ext.Template('<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">', '<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>', '</table>');
				}

				if (!ts.hcell) {
					ts.hcell = new Ext.Template('<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
							this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>' : '', '{value}<img class="x-grid3-sort-icon" src="', Ext.BLANK_IMAGE_URL, '" />', '</div></td>');
				}

				if (!ts.body) {
					ts.body = new Ext.Template('{rows}');
				}

				if (!ts.row) {
					ts.row = new Ext.Template('<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">', '<tbody><tr>{cells}</tr>', (this.enableRowBody
									? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>'
									: ''), '</tbody></table></div>');
				}

				if (!ts.cell) {
					/*
					 * ts.cell = new Ext.Template( '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>', '<div
					 * class="x-grid3-cell-inner x-grid3-col-{id}"
					 * unselectable="on" {attr}>{value}</div>', "</td>" );
					 */
					ts.cell = new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>',
							'<div class="x-grid3-cell-inner x-grid3-col-{id}" title="{tip}"   {attr}>{value}</div>', '</td>');
				}

				for (var k in ts) {
					var t = ts[k];
					if (t && typeof t.compile == 'function' && !t.compiled) {
						t.disableFormats = true;
						t.compile();
					}
				}

				this.templates = ts;
				this.colRe = new RegExp("x-grid3-td-([^\\s]+)", "");

			},
			// private
			doRender : function(cs, rs, ds, startRow, colCount, stripe) {
				var ts = this.templates, ct = ts.cell, rt = ts.row, last = colCount - 1;
				var tstyle = 'width:' + this.getTotalWidth() + ';';
				// buffers
				var buf = [], cb, c, p = {}, rp = {
					tstyle : tstyle
				}, r;
				for (var j = 0, len = rs.length; j < len; j++) {
					r = rs[j];
					cb = [];
					var rowIndex = (j + startRow);
					for (var i = 0; i < colCount; i++) {
						c = cs[i];
						p.id = c.id;
						p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
						p.attr = p.cellAttr = "";
						p.value = c.renderer(r.data[c.name], p, r, rowIndex, i, ds);
						p.style = c.style;
						if (p.value == undefined || p.value === "") {
							p.value = "&#160;";
						} else {
							p.tip = new String(p.value).replace(/<\/?.+?>/g, "");
						}
						if (r.dirty && typeof r.modified[c.name] !== 'undefined') {
							p.css += ' x-grid3-dirty-cell';
						}

						cb[cb.length] = ct.apply(p);
					}
					var alt = [];
					if (stripe && ((rowIndex + 1) % 2 == 0)) {
						alt[0] = "x-grid3-row-alt";
					}
					if (r.dirty) {
						alt[1] = " x-grid3-dirty-row";
					}
					rp.cols = colCount;
					if (this.getRowClass) {
						alt[2] = this.getRowClass(r, rowIndex, rp, ds);
					}
					rp.alt = alt.join(" ");
					rp.cells = cb.join("");
					buf[buf.length] = rt.apply(rp);
				}
				return buf.join("");
			}
		});