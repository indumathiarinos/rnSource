import { Component } from "react";
import PropTypes from "prop-types";
import { Animated, ListRenderItem, StyleProp, ViewStyle } from "react-native";
export interface HorizontalCarouselProps<Item> {
    data: Array<unknown>;
    renderItem: ListRenderItem<Item>;
    keyExtractor: (item: Item, index: number) => string;
    style: StyleProp<ViewStyle>;
}
interface HorizontalCarouselState {
    width: number;
    scrollAnimation: Animated.Value;
    highlightSection:number
}
export default class HorizontalCarousel<Item> extends Component<HorizontalCarouselProps<Item>, HorizontalCarouselState> {
    static propTypes: {
        data: PropTypes.Validator<any[]>;
        renderItem: PropTypes.Validator<(...args: any[]) => any>;
        keyExtractor: PropTypes.Validator<(...args: any[]) => any>;
        style: PropTypes.Validator<StyleProp<ViewStyle>> | undefined;
    };
    private listComponent;
    constructor(props: HorizontalCarouselProps<Item>);
    componentWillUnmount(): void;
    componentDidMount(): void;
    private updateWidth;
    private contentInset;
    private scrollToItem;
    private scrollToOffset;
    private offsetForItem;
    private renderItem;
    private lineItem;
    render(): JSX.Element;
}
export {};
