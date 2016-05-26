require 'json'

file = File.read('data.json')
temp_hash = []
data_hash = JSON.parse(file)

data_hash.each do |d|
  installments = false
  products = []
  d["product_invoice_collections"].each do |p|
    p["invoice_collections"].each do |i|
      if (i["installments"].to_i > 1)
        installments = true
      end
    end
    products.push(p["product"])
  end
  temp_hash.push({
    "creation_date" => d["creation_date"],
    "products" => products,
    "installments" => installments
    })
end

File.open("temp.json","w") do |f|
  f.write(temp_hash.to_json)
end
