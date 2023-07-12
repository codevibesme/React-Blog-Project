const Footer = () => {
    const today = new Date();
    return (
        <footer className="Footer">
            <p>Copyright &copy; Soham, {today.getFullYear()} </p>
        </footer>
    );
}
export default Footer;