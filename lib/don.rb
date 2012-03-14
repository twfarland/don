def renderInner(contentArray)
  contentArray.collect {|elem| 
    if elem.is_a? Array then toHtml elem else elem end
  }
end


def renderAttrs(attrHash)
    attrHash.collect {|attr, val|
      [' ',attr,'="',val,'"']
    }
end


def toHtml(arr)
  
  if arr.length == 0 #[]  
    ''

  elsif arr[0].is_a? Array #[htmlArray] 
    arr.collect {|e| toHtml e }

  elsif arr.length == 1 #[elementType]
    ['<',arr[0],'>']

  elsif arr[1].is_a? Hash

    if arr.length == 2 #[elementType, attributes]
      ['<',arr[0],renderAttrs(arr[1]),'>']

    else #[elementType, attributes, content...]
      ['<',arr[0],renderAttrs(arr[1]),'>',renderInner(arr[2..-1]),'</',arr[0],'>']
    end

  else #[elementType, content...]
    ['<',arr[0],'>',renderInner(arr[1..-1]),'</',arr[0],'>']
    
  end
end


def don(data, template, key)
  toHtml(template.call(data, key)).to_s
end


def donMap(dataArr, template)
  dataArr.enum_for(:each_with_index).collect {|data, key|
    don data, template, key
  }.to_s
end

