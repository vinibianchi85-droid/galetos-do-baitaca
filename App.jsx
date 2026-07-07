import { useMemo, useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle, Clock, MapPin, CreditCard } from 'lucide-react'
import logo from './logo.jpg'

const WHATSAPP = '5555999417270'
const TELE = 10

const produtos = [
  { id:'tradicional', cat:'Galetos Tradicionais', nome:'Tradicional', desc:'Galeto com polenta frita, salada verde e maionese de batata.', preco:45 },
  { id:'vinagrete', cat:'Galetos Tradicionais', nome:'Vinagrete', desc:'Galeto com cobertura de vinagrete.', preco:50 },
  { id:'deuses', cat:'Galetos Tradicionais', nome:'Deuses', desc:'Galeto especial da casa.', preco:50 },
  { id:'strogonoff', cat:'Galetos Tradicionais', nome:'Strogonoff', desc:'Galeto com molho strogonoff.', preco:55 },
  { id:'meia', cat:'Galetos Tradicionais', nome:'Meia Porção', desc:'Meia porção de galeto.', preco:25 },
  { id:'combo', cat:'Galetos Tradicionais', nome:'Combo', desc:'Galeto tradicional, salsichão, coração, maionese e batata frita.', preco:80 },
  { id:'supremo', cat:'Galetos Premium', nome:'Supremo', desc:'Galeto premium. Doritos opcional + R$5.', preco:60 },
  { id:'gorgonzola', cat:'Galetos Premium', nome:'Gorgonzola', desc:'Galeto premium. Doritos opcional + R$5.', preco:60 },
  { id:'barbecue', cat:'Galetos Premium', nome:'Barbecue', desc:'Galeto premium com molho barbecue.', preco:60 },
  { id:'campones', cat:'Galetos Premium', nome:'Camponês', desc:'Galeto premium ao molho camponês.', preco:60 },
  { id:'cheddar', cat:'Galetos Premium', nome:'Cheddar', desc:'Galeto premium com cheddar.', preco:70 },
  { id:'provolone', cat:'Galetos Premium', nome:'Provolone', desc:'Galeto premium com provolone.', preco:70 },
  { id:'parmesao', cat:'Galetos Premium', nome:'Parmesão', desc:'Galeto premium com parmesão.', preco:70 },
  { id:'harmonia', cat:'Galetos Premium', nome:'Harmonia Suprema', desc:'Galeto premium especial.', preco:70 },
  { id:'tortel-abobora-cong', cat:'Massas Artesanais', nome:'Tortel de abóbora congelado', desc:'Porção para 2 pessoas.', preco:15 },
  { id:'tortel-abobora-pronto', cat:'Massas Artesanais', nome:'Tortel de abóbora pronto com molho', desc:'Escolha molho branco, 4 queijos ou ao sugo.', preco:20 },
  { id:'tortel-frango-cong', cat:'Massas Artesanais', nome:'Tortel de frango com catupiry congelado', desc:'Porção para 2 pessoas.', preco:18 },
  { id:'tortel-frango-pronto', cat:'Massas Artesanais', nome:'Tortel de frango com catupiry pronto', desc:'Com molho.', preco:25 },
  { id:'canelone-branco-pronto', cat:'Massas Artesanais', nome:'Canelone ao molho branco pronto', desc:'Também disponível ao sugo.', preco:30 },
  { id:'canelone-cong', cat:'Massas Artesanais', nome:'Canelone congelado', desc:'Molho branco ou ao sugo.', preco:25 },
  { id:'polenta', cat:'Adicionais', nome:'Polenta s/ molho', desc:'Porção adicional.', preco:10 },
  { id:'batata', cat:'Adicionais', nome:'Batata s/ molho', desc:'Porção adicional.', preco:20 },
  { id:'salsichao', cat:'Adicionais', nome:'Salsichão s/ molho', desc:'Porção adicional.', preco:20 },
  { id:'coracao', cat:'Adicionais', nome:'Coração s/ molho', desc:'Porção adicional.', preco:25 },
  { id:'arroz', cat:'Adicionais', nome:'Arroz', desc:'Porção adicional.', preco:10 },
  { id:'maionese', cat:'Adicionais', nome:'Maionese', desc:'Porção adicional.', preco:10 },
  { id:'salpicao', cat:'Adicionais', nome:'Salpicão', desc:'Porção adicional.', preco:12 },
  { id:'cebola', cat:'Adicionais', nome:'Cebola caramelizada', desc:'Adicional.', preco:5 },
  { id:'doritos', cat:'Adicionais', nome:'Doritos', desc:'Adicional crocante.', preco:5 },
  { id:'farofa', cat:'Adicionais', nome:'Farofa', desc:'Adicional.', preco:5 },
  { id:'refri2l', cat:'Bebidas e variados', nome:'Refri 2 litros', desc:'Bebida.', preco:14 },
  { id:'refri600', cat:'Bebidas e variados', nome:'Refri 600ml', desc:'Bebida.', preco:8 },
  { id:'refri350', cat:'Bebidas e variados', nome:'Refri 350ml', desc:'Bebida.', preco:6 },
  { id:'bally', cat:'Bebidas e variados', nome:'Bally 475ml', desc:'Bebida.', preco:10 },
  { id:'agua', cat:'Bebidas e variados', nome:'Água 500ml', desc:'Bebida.', preco:4 },
  { id:'tritend', cat:'Bebidas e variados', nome:'Tritend', desc:'Variados.', preco:3 },
  { id:'trento', cat:'Bebidas e variados', nome:'Trento', desc:'Variados.', preco:4 },
]

const categorias = [...new Set(produtos.map(p => p.cat))]
const dinheiro = v => v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })

export default function App(){
  const [categoria, setCategoria] = useState(categorias[0])
  const [carrinho, setCarrinho] = useState([])
  const [dados, setDados] = useState({nome:'', telefone:'', endereco:'', referencia:'', pagamento:'Pix', troco:''})

  const itens = produtos.filter(p => p.cat === categoria)
  const subtotal = useMemo(() => carrinho.reduce((s, i) => s + i.preco * i.qtd, 0), [carrinho])
  const total = subtotal > 0 ? subtotal + TELE : 0

  function add(prod){
    setCarrinho(prev => {
      const achou = prev.find(i => i.id === prod.id)
      if(achou) return prev.map(i => i.id === prod.id ? {...i, qtd:i.qtd+1} : i)
      return [...prev, {...prod, qtd:1}]
    })
  }
  function remove(id){
    setCarrinho(prev => prev.flatMap(i => i.id === id ? (i.qtd > 1 ? [{...i, qtd:i.qtd-1}] : []) : [i]))
  }
  function finalizar(){
    if(!carrinho.length) return alert('Adicione algum item ao pedido.')
    if(!dados.nome || !dados.telefone || !dados.endereco) return alert('Preencha nome, telefone e endereço.')
    const lista = carrinho.map(i => `• ${i.qtd}x ${i.nome} - ${dinheiro(i.preco * i.qtd)}`).join('\n')
    const troco = dados.pagamento === 'Dinheiro' ? `\nTroco para: ${dados.troco || 'não informado'}` : ''
    const msg = `🍗 *Pedido Galetos do Baitaca*\n\n*Cliente:* ${dados.nome}\n*Telefone:* ${dados.telefone}\n*Endereço:* ${dados.endereco}\n*Referência:* ${dados.referencia || '-'}\n\n*Itens:*\n${lista}\n\nSubtotal: ${dinheiro(subtotal)}\nTele-entrega: ${dinheiro(TELE)}\n*Total: ${dinheiro(total)}*\n\nPagamento: ${dados.pagamento}${troco}\n\n📍 Entrega somente em Tupanciretã.`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return <div className="app">
    <header className="hero">
      <div className="heroOverlay">
        <img src={logo} className="logo" alt="Galetos do Baitaca" />
        <p className="tag">Delivery oficial</p>
        <h1>Galetos do Baitaca</h1>
        <p className="sub">Galeto, massas artesanais, adicionais e bebidas no capricho.</p>
        <div className="infos">
          <span><MapPin size={16}/> Tupanciretã</span>
          <span><Clock size={16}/> Seg-sex 18h30–22h30 · Sábado meio-dia</span>
          <span><CreditCard size={16}/> Pix, cartão ou dinheiro</span>
        </div>
      </div>
    </header>

    <main className="layout">
      <section className="menu">
        <div className="sectionTitle">
          <h2>Cardápio</h2>
          <p>Tele-entrega fixa: {dinheiro(TELE)}</p>
        </div>
        <div className="tabs">
          {categorias.map(c => <button className={c === categoria ? 'ativo' : ''} onClick={() => setCategoria(c)} key={c}>{c}</button>)}
        </div>
        <div className="grid">
          {itens.map(p => <article className="card" key={p.id}>
            <div className="foto">🍗</div>
            <div className="cardBody">
              <h3>{p.nome}</h3>
              <p>{p.desc}</p>
              <div className="cardFoot"><b>{dinheiro(p.preco)}</b><button onClick={() => add(p)}><Plus size={17}/>Adicionar</button></div>
            </div>
          </article>)}
        </div>
      </section>

      <aside className="checkout">
        <h2><ShoppingCart size={22}/> Meu pedido</h2>
        {!carrinho.length && <p className="vazio">Seu carrinho está vazio.</p>}
        {carrinho.map(i => <div className="item" key={i.id}>
          <div><strong>{i.nome}</strong><small>{dinheiro(i.preco)} cada</small></div>
          <div className="qtd"><button onClick={() => remove(i.id)}><Minus size={14}/></button><span>{i.qtd}</span><button onClick={() => add(i)}><Plus size={14}/></button></div>
        </div>)}
        {carrinho.length > 0 && <button className="limpar" onClick={() => setCarrinho([])}><Trash2 size={15}/> Limpar pedido</button>}

        <div className="totais"><span>Subtotal</span><b>{dinheiro(subtotal)}</b><span>Tele</span><b>{subtotal ? dinheiro(TELE) : dinheiro(0)}</b><span>Total</span><strong>{dinheiro(total)}</strong></div>

        <div className="form">
          <input placeholder="Seu nome" value={dados.nome} onChange={e => setDados({...dados, nome:e.target.value})}/>
          <input placeholder="Telefone" value={dados.telefone} onChange={e => setDados({...dados, telefone:e.target.value})}/>
          <input placeholder="Endereço em Tupanciretã" value={dados.endereco} onChange={e => setDados({...dados, endereco:e.target.value})}/>
          <input placeholder="Ponto de referência" value={dados.referencia} onChange={e => setDados({...dados, referencia:e.target.value})}/>
          <select value={dados.pagamento} onChange={e => setDados({...dados, pagamento:e.target.value})}>
            <option>Pix</option><option>Cartão</option><option>Dinheiro</option>
          </select>
          {dados.pagamento === 'Dinheiro' && <input placeholder="Precisa troco para quanto?" value={dados.troco} onChange={e => setDados({...dados, troco:e.target.value})}/>}        
        </div>
        <button className="whats" onClick={finalizar}><MessageCircle size={19}/> Enviar pedido pelo WhatsApp</button>
      </aside>
    </main>
  </div>
}
