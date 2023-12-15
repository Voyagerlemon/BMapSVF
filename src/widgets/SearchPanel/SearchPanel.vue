<template>
  <div class="auto-complete">
    <input
      id="address"
      ref="input"
      type="text"
      class="w-96 h-7 absolute left-20 -top-1/2 auto-complete-input"
      v-model="searchText"
      @input="search"
      @keydown.down="moveDown"
      @keydown.up="moveUp"
      @keydown.enter="select"
      @focus="showCloseIcon"
      @blur="showCloseIcon"
      placeholder="Find address or place"
    />
    <SvgIcon
      className="h-4 cursor-pointer absolute top-1.5 left-64"
      iconName="search"
    />

    <ul v-if="suggestions.length" class="suggestions">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        :class="{ active: index === activeIndex }"
        @mousedown="select(index)"
      >
        {{ suggestion.keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
export default {
  name: "SearchPanel",
  components: { SvgIcon },
  props: {
    city: {
      type: String,
      default: ""
    },
    location: {
      type: Object,
      default: null
    },
    types: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      searchText: "",
      suggestions: [],
      activeIndex: -1,
      autoComplete: null,
      showIcon: false
    };
  },
  mounted() {
    let myValue = null;
    this.autoComplete = new window.BMap.Autocomplete(
      Object.assign(
        {
          input: this.$refs.input,
          location: this.location,
          types: this.types,
          onSearchComplete: result => {
            if (this.autoComplete.getStatus() === window.BMAP_STATUS_SUCCESS) {
              const suggestions = result.getTips().map(tip => ({
                keyword: tip.keyword,
                address: tip.address,
                location: tip.location
              }));
              this.suggestions = suggestions;
              this.activeIndex = -1;
            } else {
              this.suggestions = [];
            }
          }
        },
        this.options
      )
    );
    this.autoComplete.addEventListener("onconfirm", function (event) {
      // Mouse click after the drop-down list of events
      const _value = event.item.value;
      myValue =
        _value.province +
        _value.city +
        _value.district +
        _value.street +
        _value.business;
      this.address_detail = myValue;

      window.map.clearOverlays();
      const localSearch = new window.BMap.LocalSearch(window.map, {
        // intelligent search
        onSearchComplete: addressPanorama
      });
      function addressPanorama() {
        // Get the results of your first intelligent search
        const resultPoi = localSearch.getResults().getPoi(0).point;
        window.map.centerAndZoom(resultPoi, 18);
        // Add annotation
        //window.map.addOverlay(new window.BMap.Marker(resultPoi));
      }

      localSearch.search(myValue);
    });
  },
  methods: {
    search() {
      this.autoComplete.search(this.searchText);
    },
    moveUp() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },
    moveDown() {
      if (this.activeIndex < this.suggestions.length - 1) {
        this.activeIndex++;
      }
    },
    select(index) {
      const suggestion = this.suggestions[index];
      this.$emit("select", suggestion);
      this.searchText = suggestion.keyword;
      this.suggestions = [];
    },
  }
};
</script>

<style lang="scss" scoped>
.auto-complete {
  position: relative;
  .auto-complete-input {
    border: 0.1rem solid #dcdee2;
    border-radius: 0.32rem;
    &::-webkit-input-placeholder {
      padding-left: 0.3rem;
    }
    &:focus {
      padding-left: 0.56rem;
      outline: 0.12rem ridge rgba(62, 117, 252, 0.6);
      border-radius: 0.32rem;
      box-shadow: 0 0 0.35rem #3eb1fc;
    }
  }
}
.suggestions {
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top-width: 0;
  max-height: 200px;
  overflow-y: auto;
}
.suggestions li {
  padding: 5px 10px;
  cursor: pointer;
}
.suggestions li.active {
  background-color: #f2f2f2;
}
</style>
