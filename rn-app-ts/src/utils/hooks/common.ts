import React from 'react'
import { useMemoizedFn, useSetState } from 'ahooks'
import { useAppDispatch } from './redux'
import { useSelector } from 'react-redux'
import { SmartRefreshLayout, SmartRefreshLayoutWithoutTheme } from '@zero-d/rn-components'


type GetListOptions = {
    pageIndex?: number
    successCallback?: (hasLoadingMore: boolean) => any
    errorCallback?: () => any
}

type GetRefreashAndLoadingMoreListParams<TItem, TData extends any> = {
    refreshList: React.MutableRefObject<SmartRefreshLayoutWithoutTheme | undefined>
    onRefreshSuccess?: () => any
    refreshDeps?: any[]
    formatResult?: (res: TData) => TBaseData<TItem>
    initialPageSize?: number
}

type TBaseData<TItem> = {
    list: TItem[]
    totalCount: number
}

type ServiceParams = {
    pageIndex: number
    pageSize: number
}

export function useGetRefreashAndLoadingMoreList<TItem, TData extends any>(service: (p: ServiceParams) => Promise<TData>, {
    refreshList,
    refreshDeps = [],
    onRefreshSuccess,
    formatResult,
    initialPageSize = 12
}: GetRefreashAndLoadingMoreListParams<TItem, TData>) {

    const [pageState, setState] = useSetState<{
        list: TItem[]
        isPageLoaded: boolean
        pageIndex: number
        pageSize: number
    }>({
        list: [],
        isPageLoaded: false,
        pageIndex: 1,
        pageSize: initialPageSize,
    })

    const { list, isPageLoaded, pageSize, pageIndex } = pageState;

    React.useEffect(() => {

        const refreshState = refreshList.current!.getCurrentState();
        if (refreshState != SmartRefreshLayout.RefreshState.Refreshing) {
            refreshList.current!.setNoMoreData(false);
        }
        refreshList.current!.autoRefreshAnimationOnly();
        onRefresh();

    }, [...refreshDeps])

    const getList = useMemoizedFn<(options: GetListOptions) => any>(async ({
        pageIndex = 1,
        successCallback,
        errorCallback
    }) => {
        try {
            let res = await service({ pageIndex, pageSize });
            let foramtRes = formatResult ? formatResult(res) : (res as TBaseData<TItem>);
            let hasLoadingMore = pageIndex * pageSize < foramtRes.totalCount;
            successCallback?.(hasLoadingMore)
            setState(preState => ({
                pageIndex,
                list: pageIndex == 1 ? foramtRes.list : preState.list.concat(foramtRes.list)
            }))
        } catch (error) {
            errorCallback?.()
        } finally {
            setState({ isPageLoaded: true })
        }
    })

    const onRefresh = useMemoizedFn(() => {
        getList({
            successCallback: (hasLoadingMore) => {
                onRefreshSuccess?.()
                if (hasLoadingMore) {
                    refreshList.current!.finishRefresh({ success: true })
                } else {
                    refreshList.current!.finishLoadMoreWithNoMoreData();
                }

            },
            errorCallback: () => {
                refreshList.current!.finishRefresh({ success: false });
            }
        })
    })

    const onLoadMore = useMemoizedFn(() => {
        getList({
            pageIndex: pageIndex + 1,
            successCallback: (hasLoadingMore) => {
                if (hasLoadingMore) {
                    refreshList.current!.finishLoadMore({ success: true });
                } else {
                    refreshList.current!.finishLoadMoreWithNoMoreData();
                }
            },
            errorCallback: () => {
                refreshList.current!.finishLoadMore({ success: false });
            }
        })
    })

    return {
        onRefresh,
        onLoadMore,
        pageState
    }
}