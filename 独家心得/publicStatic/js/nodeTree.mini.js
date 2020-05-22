Vue.component('node-tree', {
	props:{
		// 接收绑定参数
		value: Number,
		// 输入框宽度
		width:String,
		// 选项数据
		disabled: Boolean,
		options:{
			type:Array,
			required:true,
		},
		// 输入框占位符
		placeholder:{
			type:String,
			required:false,
			default:'请选择',
		},
		// 树节点配置选项
		props:{
			type:Object,
			required:false,
			//default:() => ({
			//	parent:'parentId',
			//	value:'rowGuid',
			//	label:'areaName',
			//	children:'children',
			//}),
			default: function () {
				return {
					parent: 'parentId',
					value: 'rowGuid',
					label: 'areaName',
					children: 'children'
				};
			}
		},
	},
	// 设置绑定参数
	model:{
		prop:'value',
		event:'selected',
	},
	computed:{
		// 是否为树状结构数据
		dataType:function() {
			const jsonStr =JSON.stringify(this.options);
			return jsonStr.indexOf(this.props.children) !==-1;
		},
		// 若非树状结构，则转化为树状结构数据
		data: function() {
			return this.dataType ? this.options :this.switchTree();
		}
	},
	watch:{
		labelModel: function(val) {
			if (!val) {
				this.valueModel ='';
			}
			this.$refs.tree.filter(val);
		},
		value: function(val) {
			this.labelModel =this.queryTree(this.data, val);
		}
	},
	data: function () {
		return {
			// 树状菜单显示状态
			showStatus:false,
			// 菜单宽度
			treeWidth:'auto',
			// 输入框显示值
			labelModel:'',
			// 实际请求传值
			valueModel:0,
		};
	},
	created: function() {
		// 检测输入框原有值并显示对应 label
		if (this.value) {
			this.labelModel =this.queryTree(this.data, this.value);
		}
		// 获取输入框宽度同步至树状菜单宽度
		this.$nextTick(function() {
			this.treeWidth =(this.width || this.$refs.input.$refs.input.clientWidth) - 24 + "px";
		});
	},
	methods:{
		// 单击节点
		onClickNode: function(node) {
			if (this.valueModel !== node[this.props.value]) {
				this.$emit('nodechange', node.nodeid);
			}
			this.labelModel = node[this.props.label];
			this.valueModel = node[this.props.value];
			this.onCloseTree();
		},
		onClickChange: function(node) {
			//this.$emit('nodechange', node.nodeid);
		},
		// 偏平数组转化为树状层级结构
		switchTree: function() {
			return this.cleanChildren(this.buildTree(this.options, '0'));
		},
		// 隐藏树状菜单
		onCloseTree: function() {
			this.$refs.popover.showPopper =false;
		},
		// 显示时触发
		onShowPopover: function() {
			if (!this.disabled) {
				this.showStatus = true;
				this.$refs.tree.filter(false);
			} else{
				this.$refs.popover.showPopper =false;
			}
			
		},
		// 隐藏时触发
		onHidePopover: function() {
			this.showStatus =false;
			this.$emit('selected', this.valueModel);
		},
		// 树节点过滤方法
		filterNode: function(query, data) {
			if (!query) return true;
			return data[this.props.label].indexOf(query) !==-1;
		},
		// 搜索树状数据中的 ID
		queryTree: function(tree, id) {
			let stark =[];
			stark =stark.concat(tree);
			while (stark.length) {
				const temp =stark.shift();
				if (temp[this.props.children]) {
					stark =stark.concat(temp[this.props.children]);
				}
				if (temp[this.props.value] ===id) {
					return temp[this.props.label];
				}
			}
			return '';
		},
		// 将一维的扁平数组转换为多层级对象
		buildTree: function (data, id) {
			if (!id) {
				id = '0';
			}
			const fa = function (parentId){
				const temp =[];
				for (let i =0; i < data.length; i++) {
					const n =data[i];
					if (n[this.props.parent] ===parentId) {
						n.children =fa(n.rowGuid);
						temp.push(n);
					}
				}
				return temp;
			};
			return fa(id);
		},
		// 清除空 children项
		cleanChildren: function(data) {
			const fa =function(list){
				list.map(function(e) {
					if (e.children.length) {
						fa(e.children);
					} else {
						delete e.children;
					}
					return e;
				});
				return list;
			};
			return fa(data);
		}
	},
	template:'<el-popover ref="popover" placement="bottom-start" trigger="click" @show="onShowPopover" @hide="onHidePopover" >' +
'<el-tree size="mini" ref="tree" class="select-tree" highlight-current :style="{\'min-width\':treeWidth}" :data="data" :props="props" :expand-on-click-node="false" :filter-node-method="filterNode"'+
' :default-expand-all="false"'+
' @node-click="onClickNode" > ' +
' @current-change="onClickChange" > ' +
'</el-tree > '+
'<el-input size="mini" slot="reference"'+
' ref="input"'+
' v-model="labelModel"'+
' clearable ' +
' :style="{\'width\':  width + \'px\'}"'+
' :class="{\'rotate\':showStatus }"'+
' suffix-icon="el-icon-arrow-down"'+
' :placeholder="placeholder" > '+
'</el-input> '+
'</el-popover> ',
	//template: `<el-popover ref="popover"
	//				placement="bottom-start"
	//				trigger="click"
	//				@show="onShowPopover"
	//				@hide="onHidePopover">
	//		<el-tree ref="tree"
	//				 class="select-tree"
	//				 highlight-current
	//				 :style="{'min-width': treeWidth }"
	//				 :data="data"
	//				 :props="props"
	//				 :expand-on-click-node="false"
	//				 :filter-node-method="filterNode"
	//				 :default-expand-all="false"
	//				 @current-change="onClickChange"
	//				 @node-click="onClickNode">
	//		</el-tree>
	//		<el-input slot="reference"
	//				  ref="input"
	//				  v-model="labelModel"
	//				  clearable
	//				  :disabled="disabled"
	//				  :style="{'width':  width + 'px'}"
	//				  :class="{ 'rotate': showStatus }"
	//				  suffix-icon="el-icon-arrow-down"
	//				  :placeholder="placeholder">
	//		</el-input>
	//	</el-popover>`
});