import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import InfiniteScroll from 'react-infinite-scroller';
import {List, Spin} from 'antd'
import styled from 'styled-components'

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;

const Component = observer(() => {
  const { HistoryStore } = useStores();
  useEffect(()=>{
    return () => {
      HistoryStore.reset()
    }
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <InfiniteScroll
        loadMore={()=>{HistoryStore.find()}}
        initialLoad={true}
        pageStart={0}
        hasMore={!HistoryStore.isLoading&&HistoryStore.hasMore}
        useWindow={true}>
        <List
          dataSource={HistoryStore.list}
          renderItem={
            item => <List.Item key={item.id}>
                  <Img src={item.attributes.url.attributes.url} alt=""/>
                  <h5>{item.attributes.filename}</h5>
                  <a target="_blank" rel="noreferrer" href={item.attributes.url.attributes.url}>
                    {item.attributes.url.attributes.url}
                  </a>
            </List.Item>
          }>
          {HistoryStore.isLoading&&HistoryStore.hasMore&&(
            <div>
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  )
})

export default Component