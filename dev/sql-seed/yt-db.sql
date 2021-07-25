--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Creds; Type: TABLE; Schema: public; Owner: yt
--

CREATE TABLE public."Creds" (
    id integer NOT NULL,
    key character varying(255),
    active boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Creds" OWNER TO yt;

--
-- Name: Creds_id_seq; Type: SEQUENCE; Schema: public; Owner: yt
--

CREATE SEQUENCE public."Creds_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Creds_id_seq" OWNER TO yt;

--
-- Name: Creds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yt
--

ALTER SEQUENCE public."Creds_id_seq" OWNED BY public."Creds".id;


--
-- Name: Videos; Type: TABLE; Schema: public; Owner: yt
--

CREATE TABLE public."Videos" (
    id character varying(255) NOT NULL,
    title character varying(255),
    description character varying(255),
    "metaData" json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Videos" OWNER TO yt;

--
-- Name: Creds id; Type: DEFAULT; Schema: public; Owner: yt
--

ALTER TABLE ONLY public."Creds" ALTER COLUMN id SET DEFAULT nextval('public."Creds_id_seq"'::regclass);


--
-- Data for Name: Creds; Type: TABLE DATA; Schema: public; Owner: yt
--

COPY public."Creds" (id, key, active, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Videos; Type: TABLE DATA; Schema: public; Owner: yt
--

COPY public."Videos" (id, title, description, "metaData", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Creds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yt
--

SELECT pg_catalog.setval('public."Creds_id_seq"', 1, false);


--
-- Name: Creds Creds_key_key; Type: CONSTRAINT; Schema: public; Owner: yt
--

ALTER TABLE ONLY public."Creds"
    ADD CONSTRAINT "Creds_key_key" UNIQUE (key);


--
-- Name: Creds Creds_pkey; Type: CONSTRAINT; Schema: public; Owner: yt
--

ALTER TABLE ONLY public."Creds"
    ADD CONSTRAINT "Creds_pkey" PRIMARY KEY (id);


--
-- Name: Videos Videos_pkey; Type: CONSTRAINT; Schema: public; Owner: yt
--

ALTER TABLE ONLY public."Videos"
    ADD CONSTRAINT "Videos_pkey" PRIMARY KEY (id);


--
-- Name: description_index; Type: INDEX; Schema: public; Owner: yt
--

CREATE INDEX description_index ON public."Videos" USING btree (description);


--
-- Name: title_index; Type: INDEX; Schema: public; Owner: yt
--

CREATE INDEX title_index ON public."Videos" USING btree (title);


--
-- PostgreSQL database dump complete
--

