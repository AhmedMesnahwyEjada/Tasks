import './Dropdown.scss'
const Dropdown = ({title, items}) => {
    return <select name={title} id={title} className='m-3 drop-down'>
        {items.map(item => {
            return <option key={item} value={item}>{item} </option>
        })}
    </select>
}
export default Dropdown;