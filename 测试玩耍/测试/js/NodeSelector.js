Vue.component("NodeSelector", {
  props: {
    value: null,
    includeRoom: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    nodeDataUrl: {
      type: String,
      default: function() {
        return "";
      }
    },
    nodeClearable: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    layout: {
      type: String,
      default: function() {
        return "vertical";
      }
    },
    defaultNode: {
      type: Object,
      default: function() {
        return {
          nodeName: "",
          nodeId: 0
        };
      }
    },
    nodeConfig: {
      type: Object,
      default: function() {
        return {
          emptyText: "",
          nodeKey: "",
          props: {
            children: "children",
            label: "label",
            value: "id"
          },
          renderAfterExpand: false,
          highlightCurrent: true,
          defaultExpandAll: false,
          expandOnClickNode: false,
          autoExpandParent: true,
          defaultExpandedKeys: [],
          accordion: false,
          indent: 0,
          iconClass: "",
          draggable: false,
          size: ""
        };
      }
    },
    nodeData: Array,
    //机房
    roomData: Array,
    roomDataUrl: {
      type: String,
      default: function() {
        return "";
      }
    },
    defaultRoom: null,
    roomConfig: {
      type: Object,
      default: function() {
        return {
          props: {
            label: "label",
            value: "value"
          },
          multiple: false,
          disabled: false,
          size: "",
          clearable: false,
          collapseTags: false,
          multipleLimit: 0,
          name: "",
          autocomplete: "off",
          placeholder: "请选择机房",
          filterable: false,
          allowCreate: false,
          noMatchText: "无匹配数据",
          popperClass: "",
          reserveKeyword: false,
          defaultFirstOption: false,
          popperAppendtoBody: false,
          automaticDropdown: false
        };
      }
    }
  },


  template:
    "<div " +
    'class="NodeSelector" ' +
    'v-loading.fullscreen="loading" ' +
    'element-loading-background="rgba(0, 0, 0, 0.2)" ' +
    ':style="{display:(layout==' +
    "'vertical'?'flex':'block')}" +
    '">' +
    "<el-popover " +
    'placement="bottom" ' +
    'width="200" ' +
    'trigger="click" ' +
    'class="tree-popover" ' +
    'v-on:show="showTree" ' +
    'v-on:hide="hideTree" ' +
    ':style="{marginBottom:(layout==' +
    "'vertical'?'0':'20px')}" +
    '">' +
    "<el-input " +
    'placeholder="输入关键字进行过滤" ' +
    'size="mini" ' +
    'suffix-icon="el-icon-search" ' +
    'v-model="filterText" ' +
    'class="treeInput" ></el-input> ' +
    "<el-tree  " +
    'class="my-tree" ' +
    ':data="nodeDataMy" ' +
    ':empty-text="nodeConfig.emptyText" ' +
    ':node-key="nodeConfig.nodeKey" ' +
    ':props="nodeConfig.props" ' +
    ':render-after-expand="nodeConfig.renderAfterExpand" ' +
    ':highlight-current="nodeConfig.highlightCurrent" ' +
    ':default-expand-all="nodeConfig.defaultExpandAll" ' +
    ':expand-on-click-node="nodeConfig.expandOnClickNode" ' +
    ':auto-expand-parent="nodeConfig.autoExpandParent" ' +
    ':default-expanded-keys="nodeConfig.defaultExpandedKeys" ' +
    ':accordion="nodeConfig.accordion" ' +
    ':indent="nodeConfig.indent" ' +
    ':icon-class="nodeConfig.iconClass" ' +
    ':draggable="nodeConfig.draggable" ' +
    '@node-click="handleNodeClick" ' +
    ':filter-node-method="filterNode" ' +
    'ref="tree" ></el-tree> ' +
    "<el-input " +
    'slot="reference" ' +
    'suffix-icon="el-icon-arrow-up" ' +
    ':clearable="nodeClearable" ' +
    ':class="[' +
    " 'treeButton',{'rotate':rotate}]" +
    '"' +
    'placeholder="请选择节点" ' +
    'v-model="defaultNode.nodeName" ' +
    ':size="nodeConfig.size" ' +
    'v-on:clear="clearNode" ></el-input> ' +
    "</el-popover> " +
    "<el-select " +
    'v-if="includeRoom" ' +
    'v-model="roomId" ' +
    'class="my-select" ' +
    'v-on:change="changeRoom" ' +
    ':multiple="roomConfig.multiple" ' +
    ':disabled="roomConfig.disabled" ' +
    ':size="roomConfig.size" ' +
    ':clearable="roomConfig.clearable" ' +
    ':collapse-tags="roomConfig.collapseTags" ' +
    ':multiple-limit="roomConfig.multipleLimit" ' +
    ':name="roomConfig.name" ' +
    ':autocomplete="roomConfig.autocomplete" ' +
    ':placeholder="roomConfig.placeholder" ' +
    ':filterable="roomConfig.filterable" ' +
    ':allow-create="roomConfig.allowCreate" ' +
    ':no-match-text="roomConfig.noMatchText" ' +
    ':popper-class="roomConfig.popperClass" ' +
    ':reserve-keyword="roomConfig.reserveKeyword" ' +
    ':default-first-option="roomConfig.defaultFirstOption" ' +
    ':popper-append-to-body="roomConfig.popperAppendtoBody" ' +
    ':automatic-dropdown="roomConfig.automaticDropdown"> ' +
    "<el-option " +
    'v-for="item in roomDataFilter" ' +
    ':key="item[roomConfig.props.value]" ' +
    ':label="item[roomConfig.props.label]" ' +
    ':value="item[roomConfig.props.value]" ' +
    "></el-option> " +
    "</el-select> " +
    "</div>",
  data: function() {
    return {
      myValue: null,
      loading: false,
      filterText: "",
      rotate: true,
      nodeDataMy: [],
      nodeId: 0,
      nodeChoose: null,
      roomChoose: null,
      roomDataFilter: [],
      roomDataMy: [],
      roomId: ""
    };
  },
  methods: {
    filterRoom: function() {
      let nodeId = this.nodeId;
      let roomDataMy = JSON.parse(JSON.stringify(this.roomDataMy));
      roomDataMy = roomDataMy.filter(function(item) {
        return item.nodeId == nodeId;
      });
      this.roomDataFilter = roomDataMy;
    },
    changeRoom: function(roomId) {
      let roomDataMy = JSON.parse(JSON.stringify(this.roomDataMy));
      let that = this;
      if (typeof this.roomId == "string") {
        roomId = [roomId];
      }
      if (!this.roomId) {
        roomId = [];
      }
      let roomChoose = [];
      for (let i = 0; i < roomId.length; i++) {
        let item = roomDataMy.filter(function(item) {
          return item[that.roomConfig.props.value] == roomId[i];
        });
        roomChoose.push(item[0]);
      }
      if (typeof this.roomId == "string") {
        this.roomChoose = roomChoose[0];
        this.$emit("input", {
          room: roomChoose[0],
          node: that.nodeChoose
        });
        this.$emit("room-change", { room: roomChoose[0] });
        this.$emit("change", { room: roomChoose[0], node: that.nodeChoose });
      } else {
        this.roomChoose = roomChoose;
        this.$emit("input", {
          room: roomChoose,
          node: that.nodeChoose
        });
        this.$emit("room-hange", { room: roomChoose });
        this.$emit("change", { room: roomChoose, node: that.nodeChoose });
      }
    },
    filterNode: function(value, data) {
      if (!value) return true;
      return data[this.nodeConfig.props.label].indexOf(value) !== -1;
    },
    clearNode: function() {
      let that = this;
      this.nodeId = 0;
      this.defaultNode.nodeName = "";
      this.filterRoom();
      this.nodeChoose = {};
      if (this.roomConfig.multipleLimit) {
        that.roomChoose = [];
      } else {
        that.roomChoose = {};
      }
      this.$emit("input", { node: {}, room: that.roomChoose });
      this.$emit("node-change", { node: {} });
      this.$emit("change", { node: {}, room: that.roomChoose });
      if (typeof this.roomId == "string") {
        this.roomId = "";
      } else {
        this.roomId = [];
      }
    },
    handleNodeClick: function(node) {
      let that = this;
      this.nodeId = node.id;
      this.defaultNode.nodeName = node.text;
      this.filterRoom();
      this.nodeChoose = node;
      if (this.roomConfig.multipleLimit) {
        that.roomChoose = [];
      } else {
        that.roomChoose = {};
      }
      this.$emit("input", { node: node, room: that.roomChoose });
      this.$emit("node-change", { node: node });
      this.$emit("change", { node: node, room: that.roomChoose });
      if (typeof this.roomId == "string") {
        this.roomId = "";
      } else {
        this.roomId = [];
      }
    },
    showTree: function() {
      this.rotate = false;
    },
    hideTree: function() {
      this.rotate = true;
    }
  },
  watch: {
    filterText: function(newVal, oldVal) {
      this.$refs.tree.filter(newVal);
    },
    roomData: function(newVal, oldVal) {
      this.roomDataMy = newVal;
      if (this.defaultNode.nodeId) {
        this.nodeId = this.defaultNode.nodeId;
        this.filterRoom();
      }
    },
    nodeData: function(newVal, oldVal) {
      this.nodeDataMy = newVal;
    },
    defaultNode: {
      immediate: true,
      handler: function(newVal, oldVal) {
        this.nodeId = newVal.nodeId;
      }
    },
    defaultRoom: function(newVal, oldVal) {
      this.roomId = JSON.parse(JSON.stringify(newVal));
      this.filterRoom();
    }
  },
  mounted: function() {
    let that = this;
    let roomConfig = {
      props: {
        label: "roomName",
        value: "roomId"
      },
      multiple: false,
      disabled: false,
      size: "",
      clearable: false,
      collapseTags: false,
      multipleLimit: 0,
      name: "",
      autocomplete: "off",
      placeholder: "请选择机房",
      filterable: false,
      allowCreate: false,
      noMatchText: "无匹配数据",
      popperClass: "",
      reserveKeyword: false,
      defaultFirstOption: false,
      popperAppendtoBody: false,
      automaticDropdown: false
    };
    let nodeConfig = {
      emptyText: "",
      nodeKey: "",
      props: {
        children: "nodes",
        label: "text",
        value: "id"
      },
      renderAfterExpand: false,
      highlightCurrent: true,
      defaultExpandAll: false,
      expandOnClickNode: false,
      autoExpandParent: true,
      defaultExpandedKeys: [],
      accordion: false,
      indent: 0,
      iconClass: "",
      draggable: false,
      size: ""
    };
    for (let i in roomConfig) {
      if (this.roomConfig[i] == undefined) {
        this.roomConfig[i] = roomConfig[i];
      }
    }
    for (let i in nodeConfig) {
      if (this.nodeConfig[i] == undefined) {
        this.nodeConfig[i] = nodeConfig[i];
      }
    }
    if (this.defaultRoom) {
      this.roomId = JSON.parse(JSON.stringify(this.defaultRoom));
    }
    if (this.nodeDataUrl) {
    axios.post(this.nodeDataUrl).then(function(nodeRes) {
        that.nodeDataMy = [nodeRes.data.content];
      });
    }
    if (this.roomDataUrl) {
   axios.post(this.roomDataUrl).then(function(roomRes) {
        that.roomDataMy = roomRes.data.content;
        that.filterRoom();
      });
    }
  }
});
