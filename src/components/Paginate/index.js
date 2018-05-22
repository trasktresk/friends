import React, { Component } from 'react';
import css from './paginate.scss';


class Paginate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            sliceFrom: 0,
            currentFirstVisiblePage: 0
        };

        this.visiblePages = 12;
        this.itemsPerPage = 10;
        this.pagesCount = 0;

        this.renderPages = this.renderPages.bind(this);
        this.onPageClick = this.onPageClick.bind(this);
        this.updateSliceFrom = this.updateSliceFrom.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setState({
                currentPage: 0,
                sliceFrom: 0,
                currentFirstVisiblePage: 0
            });
        }
    }

    renderPages() {
        const { items } = this.props;
        const { sliceFrom, currentPage } = this.state;
        this.pagesCount = Math.ceil(items.length / this.itemsPerPage);
        let pagesComponents = [];

        if (this.pagesCount > this.visiblePages) {
            pagesComponents.push(
                <div
                    key="tofirst"
                    onClick={() => this.updateSliceFrom(0)}
                    className={css.page}
                >&lt;&lt;</div>
            );
            pagesComponents.push(
                <div
                    key="stepleft"
                    onClick={() => this.updateSliceFrom(sliceFrom - 1)}
                    className={css.page}
                >&lt;</div>
            );
        }

        for(let i = sliceFrom; i < sliceFrom + this.visiblePages && i < this.pagesCount; i++) {
            pagesComponents.push(
                <div
                    key={i}
                    onClick={() => this.onPageClick(i)}
                    className={[css.page, currentPage === i ? css.pageActive : ''].join(' ')}
                >{i + 1}</div>
            );
        }

        if (this.pagesCount > this.visiblePages) {
            pagesComponents.push(
                <div
                    key="stepright"
                    onClick={() => this.updateSliceFrom(sliceFrom + 1)}
                    className={css.page}
                >&gt;</div>
            );
            pagesComponents.push(
                <div
                    key="tolast"
                    onClick={() => this.updateSliceFrom(this.pagesCount - this.visiblePages)}
                    className={css.page}
                >&gt;&gt;</div>
            );
        }

        return pagesComponents;
    }

    updateSliceFrom(from) {
        if (from >= 0 && this.pagesCount >= from + this.visiblePages) {
            this.setState({ sliceFrom: from });
        }
    }

    onPageClick(page) {
        this.setState({ currentPage: page });
    }

    render() {
        const { items, itemsContainerClass, paginationBoxClass } = this.props;
        const {  currentPage } = this.state;

        return (
            <div>
                <div className={itemsContainerClass}>
                    {items.slice(currentPage * this.itemsPerPage, currentPage * this.itemsPerPage + this.itemsPerPage)}
                </div>
                <div className={paginationBoxClass}>
                    {this.renderPages()}
                </div>
            </div>
        );
    }
}

export default Paginate;
