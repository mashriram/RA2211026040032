// frontend/components/Layout.js
import Head from 'next/head';

const Layout = ({children}) => {
return(
<>
<Head>
<title>My Social Media App</title>
</Head>
<div>
{/Can add navigation/}
<main>{children}</main>
</div>
</>
)
};
export default Layout;

